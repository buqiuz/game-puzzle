/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { image } from '@kit.ImageKit';
import { photoAccessHelper } from '@kit.MediaLibraryKit';
import { dataSharePredicates } from '@kit.ArkData';
import { Context } from '@kit.AbilityKit';
import { fileIo } from '@kit.CoreFileKit';
import Logger from './Logger';
import PictureItem from './PictureItem';

const TAG = '[ImageModel]';

export default class ImageModel {
  private phAccessHelper: photoAccessHelper.PhotoAccessHelper | null = null;
  private  albumPath: string = '';


  constructor(context: Context) {
    this.phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
  }

  async getAllImg(): Promise<photoAccessHelper.PhotoAsset[]> {
    Logger.info('getAllImg');
    let photoList: Array<photoAccessHelper.PhotoAsset> = [];
    if (this.phAccessHelper === null) {
      Logger.info('phAccessHelper fail');
      return photoList;
    }
    let fileKeyType = photoAccessHelper.PhotoKeys.PHOTO_TYPE;
    let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
    Logger.info(fileKeyType);
    let fetchOptions: photoAccessHelper.FetchOptions = {
      fetchColumns: [],
      predicates: predicates
    };

    try {
      let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> =
        await this.phAccessHelper.getAssets(fetchOptions);
      if (fetchResult != undefined) {
        Logger.info('fetchResult success');
        let photoAsset: Array<photoAccessHelper.PhotoAsset> = await fetchResult.getAllObjects();
        if (photoAsset != undefined && photoAsset.length > 0) {
          for (let i = 0; i < photoAsset.length; i++) {
            if (photoAsset[i].photoType === 1) {
              photoList.push(photoAsset[i]);
            }
          }
        }
      }
    } catch (err) {
      Logger.error('getAssets failed, message = ', err);
    }
    Logger.info('photoList success');
    return photoList;
  }

  //从图库中选择图片然后划分
  async getPictureFromAlbum(splitCount: number): Promise<PictureItem[]> {
    // 拉起相册，选择图片
    let PhotoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
    PhotoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
    PhotoSelectOptions.maxSelectNumber = 1;
    let photoPicker = new photoAccessHelper.PhotoViewPicker();
    let photoSelectResult: photoAccessHelper.PhotoSelectResult = await photoPicker.select(PhotoSelectOptions);
    this.albumPath = photoSelectResult.photoUris[0];

    // 读取图片为buffer
    const file = fileIo.openSync(this.albumPath, fileIo.OpenMode.READ_ONLY);

    // this.photoSize = fileIo.statSync(file.fd).size;
    // console.info('Photo Size: ' + this.photoSize);
    // let buffer = new ArrayBuffer(this.photoSize);
    // fileIo.readSync(file.fd, buffer);
    // fileIo.closeSync(file);
    //
    // // 解码成PixelMap
    // const imageSource = image.createImageSource(buffer);
    // console.log('imageSource: ' + JSON.stringify(imageSource));
    // this.pixel = await imageSource.createPixelMap({});
    // return this.pixel;

    let imagePixelMap: PictureItem[] = [];
    let fd: number = file.fd;
    let imageSource = image.createImageSource(fd);
    let imageInfo = await imageSource.getImageInfo();
    Logger.info(TAG, `sizeImg createImageSource ${JSON.stringify(imageSource)}`);
    let height = imageInfo.size.height / splitCount;
    let width = imageInfo.size.width / splitCount;
    for (let i = 0; i < splitCount; i++) {
      for (let j = 0; j < splitCount; j++) {
        let picItem: PictureItem;
        if (i === splitCount - 1 && j === splitCount - 1) {
          picItem = new PictureItem(splitCount*splitCount-1, {} as image.PixelMap);
          imagePixelMap.push(picItem);
        } else {
          Logger.info(TAG, `sizeImg x = ${width} y = ${height}`);
          let decodingOptions: image.DecodingOptions = {
            desiredRegion: {
              size: {
                height: height,
                width: width
              }, x: j * width, y: i * height
            }
          }
          imagePixelMap.push(
            new PictureItem(i * splitCount + j, await imageSource.createPixelMap(decodingOptions)));
        }
      }
    }
    return imagePixelMap;
  }


  //图片划分
  async splitPic(index: number,splitCount: number): Promise<PictureItem[]> {

    let imagesData: Array<photoAccessHelper.PhotoAsset> = await this.getAllImg();
    let imagePackerApi = image.createImagePacker();

    let file=await fileIo.open(imagesData[index].uri, fileIo.OpenMode.READ_ONLY)

    let imagePixelMap: PictureItem[] = [];
    let fd: number = file.fd;
    let imageSource = image.createImageSource(fd);
    let imageInfo = await imageSource.getImageInfo();
    Logger.info(TAG, `sizeImg createImageSource ${JSON.stringify(imageSource)}`);
    let height = imageInfo.size.height / splitCount;
    let width = imageInfo.size.width / splitCount;
    for (let i = 0; i < splitCount; i++) {
      for (let j = 0; j < splitCount; j++) {
        let picItem: PictureItem;
        if (i === splitCount - 1 && j === splitCount - 1) {
          picItem = new PictureItem(splitCount*splitCount-1, {} as image.PixelMap);
          imagePixelMap.push(picItem);
        } else {
          Logger.info(TAG, `sizeImg x = ${width} y = ${height}`);
          let decodingOptions: image.DecodingOptions = {
            desiredRegion: {
              size: {
                height: height,
                width: width
              }, x: j * width, y: i * height
            }
          }
          imagePixelMap.push(
            new PictureItem(i * splitCount + j, await imageSource.createPixelMap(decodingOptions)));
        }
      }
    }

    imagePackerApi.release();
    fileIo.closeSync(fd);

    return imagePixelMap;
  }
}
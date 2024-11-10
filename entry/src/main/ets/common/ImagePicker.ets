/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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

import { photoAccessHelper } from '@kit.MediaLibraryKit';
import { CommonConstants as Common } from './CommonConstants';

@CustomDialog
export default struct ImagePicker {
  @Link index: number ;
  @State selected: number = Common.ZERO;
  private imagesData: Array<photoAccessHelper.PhotoAsset> = [];
  public controller: CustomDialogController;

  aboutToAppear() {
    this.selected = this.index;
  }

  build() {
    Column() {
      List({ space: Common.LIST_SPACE }) {
        ForEach(this.imagesData, (item: photoAccessHelper.PhotoAsset, index) => {
          ListItem() {
            Stack({ alignContent: Alignment.TopEnd }) {
              Image(item.uri)
                .width($r('app.float.image_width'))
                .height($r('app.float.image_height'))
                .margin({
                  left: $r('app.float.margin_side'),
                  right: $r('app.float.margin_side'),
                  top: $r('app.float.margin_up'),
                  bottom: $r('app.float.margin_up')
                })
              Radio({ value: Common.RADIO_VALUE, group: Common.RADIO_GROUP })
                .id(`radio${this.selected + Common.ONE}_${index + Common.ONE}`)
                .checked(index === this.selected ? true : false)
                .onChange(() => {
                  this.selected = index;
                })
            }
          }
        }, (item: photoAccessHelper.PhotoAsset) => JSON.stringify(item))
      }
      .width(Common.LIST_WIDTH)
      .height($r('app.float.list_height'))
      .listDirection(Axis.Horizontal)

      Row() {
        Button($r('app.string.cancel'))
          .id(Common.CANCEL_BUTTON)
          .margin({ right: Common.BUTTON_MARGIN })
          .onClick(() => {
            this.controller.close();
          })
        Button($r('app.string.submit'))
          .id(Common.CONFIRM_BUTTON)
          .onClick(() => {
            this.index = this.selected;
            this.controller.close();
          })
      }
      .margin({ bottom: $r('app.float.margin_bottom') })
    }
    .width(Common.FULL_WIDTH)
  }
}
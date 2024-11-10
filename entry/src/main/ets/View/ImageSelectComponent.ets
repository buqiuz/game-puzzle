import { photoAccessHelper } from "@kit.MediaLibraryKit";
import ImageModel from "../model/ImageModel";
import PictureItem from "../model/PictureItem";

@Component
export struct ImageSelectComponent{
  @State imgData: Array<photoAccessHelper.PhotoAsset> = [];
  @Link numArray: PictureItem[]
  @Link templateIndex: number
  @Link  isGameStart: boolean

  private ImageModel: ImageModel = new ImageModel(getContext(this));

  async aboutToAppear() {
    this.imgData = await this.ImageModel.getAllImg();
  }

  build() {
    Column({ space: 5 }) {
      Grid() {
        ForEach(this.imgData, (item:photoAccessHelper.PhotoAsset,index:number) => {
          if (index<9){
            GridItem() {
              Image(item.uri)
                .onClick(async ()=>{

                  if (!this.isGameStart){
                    if (this.numArray.length) {
                      this.numArray=[]
                    }
                    this.numArray=await this.ImageModel.splitPic(index,this.templateIndex+2)
                  }

                })
            }
            .margin({right:10})
          }

        })
      }
      .width('90%')
      .height('25%')
      .rowsTemplate('1fr') // 只设置rowsTemplate属性，当内容超出Grid区域时，可水平滚动。
      .rowsGap(15)
      .margin({
        bottom:20
      })
    }
  }
}
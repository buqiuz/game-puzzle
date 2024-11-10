import ImageModel from "../model/ImageModel"
import PictureItem from "../model/PictureItem"

@Component
export struct SelectComponent {
  @Link index: number
  @Link templateIndex: number
  @Link numArray: PictureItem[]
  @Link isGameStart: boolean
  @State text: string = "难度选择"
  @State space: number = 8
  @State arrowPosition: ArrowPosition = ArrowPosition.END
  private ImageModel: ImageModel = new ImageModel(getContext(this));
  build() {
    Column() {
      Select([{ value: '2 x 2', icon: $r("app.media.flag") },
        { value: '3 x 3', icon: $r("app.media.flag") },
        { value: '4 x 4', icon: $r("app.media.flag") },
        { value: '5 x 5', icon: $r("app.media.flag") },
        { value: '6 x 6', icon: $r("app.media.flag") }])
        .selected(this.index)
        .value(this.text)
        .font({ size: 16, weight: 500 })
        .fontColor('#182431')
        .selectedOptionFont({ size: 16, weight: 400 })
        .optionFont({ size: 16, weight: 400 })
        .space(this.space)
        .arrowPosition(this.arrowPosition)
        .menuAlign(MenuAlignType.START, {dx:0, dy:0})
        .optionWidth(200)
        .optionHeight(300)
        .enabled(!this.isGameStart)
        .onSelect(async (index:number, text?: string | undefined)=>{
          console.info('Select:' + index)
          if(this.numArray.length){
            this.numArray=[];
          }
          this.templateIndex = index;
          this.numArray=await this.ImageModel.splitPic(this.index,this.templateIndex+2)
          this.isGameStart = false;

        })
    }
  }
}
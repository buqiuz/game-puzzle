import GameRules from "../model/GameRules"
import PictureItem from "../model/PictureItem"
import { TipsDialog } from "@kit.ArkUI"

@Component
export struct ImageGridComponent{
  @Link templateIndex: number
  @Link numArray: PictureItem[]
  @Link isGameStart: boolean
  @Link @Watch('onTimeOver') gameTime: number
  @Link showDigit:boolean ;
  @Link timer:number
  @Link game: GameRules
  @Link isPause: boolean
  private template: string[] =['1fr 1fr','1fr 1fr 1fr','1fr 1fr 1fr 1fr','1fr 1fr 1fr 1fr 1fr','1fr 1fr 1fr 1fr 1fr 1fr'];



  dialogControllerImage: CustomDialogController = new CustomDialogController({
    builder: TipsDialog({
      imageRes: $r("app.media.success_6032148_1280"),
      imageSize:{width:'100vp',height:'100vp'},
      content: '恭喜你完成拼图',
      primaryButton: {
        value: '确定',
        action: () => {
          this.isGameStart=false
        },
      },
      onCheckedChange: () => {
        console.info('Callback when the checkbox is clicked')
      }
    }),
  })

  gameOver() {
    let count = 0;
    let loop = (this.templateIndex+2)*(this.templateIndex+2)-1;
    for (let i = 0; i < loop; i++) {
      if (this.numArray[i].index === i) {
        count++;
      } else {
        count = 0;
        break;
      }
    }
    if (count === loop) {
      this.isGameStart = false;
      this.dialogControllerImage.open();
      clearInterval(this.timer);
      this.gameTime = 300;
    }
  }


  onTimeOver() {
    if (this.gameTime === 0) {
      this.isGameStart = false;
      AlertDialog.show({ message: 'TimeOver' });
      clearInterval(this.timer);
    }
  }

  build() {
    Grid() {
      ForEach(this.numArray, (item: PictureItem, index) => {
        GridItem() {
          Stack(){
            Image(item.pixelMap)
              .width(350/(this.templateIndex+2))
              .objectFit(ImageFit.Fill)
              .height(260/(this.templateIndex+2))
            if(this.showDigit)
              Text((item.index+1).toString())
                .fontColor(Color.Yellow)
          }
        }
        .id(`image${index}`)
        .backgroundColor(item.pixelMap === undefined ? $r('app.color.blank_picture_background') : $r('app.color.picture_background'))
        .onClick(() => {
          if (this.isGameStart&&!this.isPause) {
            this.numArray = this.game.gameInit(index, this.numArray);
            this.gameOver();
          }
        })
      }, (item: PictureItem) => JSON.stringify(item))
    }
    .id('imageGrid')
    .rowsTemplate(this.template[this.templateIndex])
    .columnsTemplate(this.template[this.templateIndex])
    .columnsGap($r('app.float.gap'))
    .rowsGap($r('app.float.gap'))
    .width(350)
    .height(260)
    .margin({ left: 0, top: 5 })
  }
}
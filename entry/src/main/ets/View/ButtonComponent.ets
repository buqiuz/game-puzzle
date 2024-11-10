import GameRules from "../model/GameRules"
import ImageModel from "../model/ImageModel"
import PictureItem from "../model/PictureItem"

@Component
export struct restartButton{
  @Link isGameStart:boolean
  @Link gameTime:number
  @Link numArray: PictureItem[]
  @Link timer:number
  @Link game: GameRules
  @Link isPause: boolean
  @Link templateIndex: number
  @Link index: number
  private ImageModel: ImageModel = new ImageModel(getContext(this));

  init() {
    this.gameTime = 300;
    clearInterval(this.timer);
  }

  start() {
    this.init();
    this.timer = setInterval(() => {
      if (!this.isPause) {
        this.gameTime--;
      }
    }, 1000)
  }

  build() {
    Button('重置', { type: ButtonType.Capsule, stateEffect: true })
      .id('restart')
      .height($r('app.float.button_height'))
      .width('90%')
      .fontSize($r('app.float.button_font_size'))
      .margin({ top: 5 })
      .backgroundColor(this.isGameStart ? $r('app.color.allow') : $r('app.color.forbid'))
      .enabled(this.isGameStart)
      .onClick(async () => {
        this.isGameStart = false;
        this.isPause=false;
        this.init();
        // this.start();
        // this.numArray = this.game.gameBegin(this.numArray);
        if (this.numArray) {
          this.numArray=[];
        }
        this.numArray = await this.ImageModel.splitPic(this.index,this.templateIndex+2);
      })
  }
}

@Component
export struct beginButton{
  @Link isGameStart:boolean
  @Link gameTime:number
  @Link numArray: PictureItem[]
  @Link timer:number
  @Link isPause: boolean
  @Link game: GameRules


  init() {
    // this.gameTime = 300;
    clearInterval(this.timer);
  }

  start() {
    this.init();
    this.timer = setInterval(() => {
      if (!this.isPause) {
        this.gameTime--;
      }
    }, 1000)
  }

  build() {
    Button($r('app.string.start'), { type: ButtonType.Capsule, stateEffect: true })
      .id('begin')
      .height($r('app.float.button_height'))
      .width('90%')
      .fontSize($r('app.float.button_font_size'))
      .margin({ top: 5 })
      .backgroundColor(this.isGameStart ? $r('app.color.forbid') : $r('app.color.allow'))
      .enabled(!this.isGameStart&&this.numArray.length>0)
      .onClick(() => {
        this.isGameStart = true;
        this.isPause=false;
        this.start();
        this.numArray = this.game.gameBegin(this.numArray);
      })
  }
}
@Component
export struct selectPictureButton{

  @Link isGameStart:boolean
  @Link numArray: PictureItem[]
  @Link templateIndex: number
  private ImageModel: ImageModel = new ImageModel(getContext(this));
  build() {
    Button('从图库选择', { type: ButtonType.Capsule, stateEffect: true })
      .id('selectPicture')
      .fontSize($r('app.float.button_font_size'))
      .margin({ top: 20 })
      .backgroundColor('#f5f5f5')
      .fontColor('#182431')
      .enabled(!this.isGameStart)
      .onClick(async () => {
        if (!this.isGameStart){
          if (this.numArray.length) {
            this.numArray=[]
          }
          this.numArray=await this.ImageModel.getPictureFromAlbum(this.templateIndex+2)
        }
      })
  }
}
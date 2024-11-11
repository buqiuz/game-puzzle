import GameRules from "../model/GameRules"
import ImageModel from "../model/ImageModel"
import PictureItem from "../model/PictureItem"
import PuzzleSolver from "../model/PuzzleSolver"
import { TipsDialog } from "@kit.ArkUI"

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
  @Link ImageModel: ImageModel ;

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
      // .height($r('app.float.button_height'))
      .width('30%')
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
  @Link ImageModel: ImageModel ;
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

@Component
export struct recoveryButton{

  @Link isGameStart:boolean
  @Link numArray: PictureItem[]
  @Link templateIndex: number
  @Link game: GameRules
  @Link ImageModel: ImageModel
  @Link gameTime: number
  @Link timer: number

  private buttonWidth:string = '30%';
  private startState:number[]=[];
  private path:number[]|null=[];
  // private ImageModel: ImageModel = new ImageModel(getContext(this));

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

  initStartState (){
    if (this.startState.length) {
      this.startState =[];
    }

    for (let index = 0; index < this.numArray.length; index++) {
      const element = this.numArray[index];
      this.startState.push(element.index);
    }
  }

  // 定义延迟函数
  delay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

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

  async reStart() {
    if (this.path) {
      for (let index = 0; index < this.path.length; index++) {
        const element = this.path[index];
        this.numArray = this.game.itemChange(element, this.numArray);
        // 每次调用后暂停 300 毫秒
        await this.delay(400);
        // return; // 如果 path 为 null，直接返回
      }
      this.gameOver();
      // this.gameOver;
    }
  }





  build() {
    Button('自动复原', { type: ButtonType.Capsule, stateEffect: true })
      .id('selectPicture')
      .width(this.buttonWidth)
      .fontSize($r('app.float.button_font_size'))
      .margin({ top: 5 })
      .backgroundColor(this.isGameStart ? $r('app.color.allow') : $r('app.color.forbid'))
      // .fontColor('#182431')
      .enabled(this.isGameStart)
      .onClick(async () => {
        this.initStartState();
        const solver = new PuzzleSolver(this.templateIndex + 2);

        try {
          // 异步运行 aStar 算法
          this.path = await new Promise<number[] | null>((resolve) => {
            setTimeout(() => resolve(solver.aStar(this.startState)), 0);
          });

          if (this.path) {
            // 在 aStar 结束后运行 reStart
            await this.reStart();
          } else {
            console.error("未找到解决方案。");
          }
        } catch (error) {
          console.error("运行 aStar 时出错:", error);
        }
      })
  }
}
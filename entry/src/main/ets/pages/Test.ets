import PictureItem from "../model/PictureItem";
import { ImageGridComponent } from "../View/ImageGridComponent";
import { ImageSelectComponent } from "../View/ImageSelectComponent"
import GameRules from "../model/GameRules";
import ImageModel from "../model/ImageModel";
import { beginButton, selectPictureButton } from "../View/ButtonComponent";
import { TimerComponent } from "../View/TimerComponent";
import { PageParam } from "../viewModel/PageParam";
import PuzzleSolver from "../model/PuzzleSolver";

@Builder
export function PageTestBuilder() {
  Test()
}

@Component
struct Test {
  @State numArray: PictureItem[] = [];
  @State templateIndex: number = 3;
  @State showDigit:boolean =false;
  @State gameTime: number = 200;
  @State timer: number = -1;
  @State isPause: boolean=false;
  @State isGameStart: boolean = false;
  @State game: GameRules = new GameRules();

  private startState:number[]=[];
  private path:number[]|null=[];

  private ImageModel: ImageModel = new ImageModel(getContext(this));


  pageInfos: NavPathStack = new NavPathStack();

  async aboutToAppear() {
    // await abilityAccessCtrl.createAtManager().requestPermissionsFromUser(getContext(this), PERMISSIONS);
    // this.imgData = await this.ImageModel.getAllImg();
    // Logger.info(Common.TAG, `images = ${this.imgData.length}`);
    // this.numArray = await this.ImageModel.splitPic(0,this.templateIndex+2);
  }


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

  async reStart() {
    if (this.path) {
      for (let index = 0; index < this.path.length; index++) {
        const element = this.path[index];
        this.numArray = this.game.itemChange(element, this.numArray);

        // 每次调用后暂停 300 毫秒
        await this.delay(400);
      // return; // 如果 path 为 null，直接返回
    }
    }
  }


  build() {
    NavDestination(){
      Column(){
        TimerComponent({gameTime:this.gameTime})
        ImageSelectComponent({templateIndex:this.templateIndex,numArray:this.numArray,isGameStart:this.isGameStart})
        ImageGridComponent({isGameStart:this.isGameStart,numArray:this.numArray,templateIndex:this.templateIndex,showDigit:this.showDigit,gameTime:this.gameTime,timer:this.timer,game:this.game,isPause:this.isPause})

        Column(){
        }
        .height('10%')

        beginButton({gameTime:this.gameTime,isGameStart:this.isGameStart,numArray:this.numArray,timer:this.timer,game:this.game,isPause:this.isPause})

        // Button('自动完成')
        //   .onClick(()=>{
        //     this.initStartState();
        //     const solver = new PuzzleSolver(this.templateIndex+2);
        //     this.path=solver.aStar(this.startState);
        //     this.reStart();
        //   })
        Button('自动完成')
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
          });

        // selectPictureButton({isGameStart:this.isGameStart,numArray:this.numArray,templateIndex:this.templateIndex})
      }
    }.title('闯关模式')
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack;
      // try {
      //   this.gameTime = (context?.pathInfo?.param as PageParam)?.gameTime;
      //   this.templateIndex = (context?.pathInfo?.param as PageParam)?.templateIndex;
      //   this.showDigit = (context?.pathInfo?.param as PageParam)?.isShowDigit;
      // } catch (e) {
      //   console.log(`testTag onReady catch exception: ${JSON.stringify(e)}`)
      // }
    })
    .menus([
      {'value': "搜索", 'icon': "resources/base/media/rectangle_on_rectangle.svg", 'action': async () => {
        if (!this.isGameStart){
          if (this.numArray.length) {
            this.numArray=[]
          }
          this.numArray=await this.ImageModel.getPictureFromAlbum(this.templateIndex+2)
        }
      }},
    ])


  }
}
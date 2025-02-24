import PictureItem from "../model/PictureItem";
import { ImageGridComponent } from "../View/ImageGridComponent";
import { ImageSelectComponent } from "../View/ImageSelectComponent"
import GameRules from "../model/GameRules";
import ImageModel from "../model/ImageModel";
import { beginButton, recoveryButton, restartButton, selectPictureButton } from "../View/ButtonComponent";
import { TimerComponent } from "../View/TimerComponent";
import { PageParam } from "../viewModel/PageParam";

@Builder
export function PageGameBuilder() {
  Game2()
}

@Component
struct Game2 {
  @State numArray: PictureItem[] = [];
  @State templateIndex: number = 1;
  @State showDigit:boolean =false;
  @State gameTime: number = 200;
  @State timer: number = -1;
  @State isPause: boolean=false;
  @State isGameStart: boolean = false;
  @State game: GameRules = new GameRules();

  @State imageModel: ImageModel = new ImageModel(getContext(this));


  pageInfos: NavPathStack = new NavPathStack();

  async aboutToAppear() {
    // await abilityAccessCtrl.createAtManager().requestPermissionsFromUser(getContext(this), PERMISSIONS);
    // this.imgData = await this.ImageModel.getAllImg();
    // Logger.info(Common.TAG, `images = ${this.imgData.length}`);
    // this.numArray = await this.ImageModel.splitPic(0,this.templateIndex+2);
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
        recoveryButton({ImageModel:this.imageModel,game:this.game,gameTime:this.gameTime,isGameStart:this.isGameStart,numArray:this.numArray,templateIndex:this.templateIndex,timer:this.timer,buttonWidth:'90%'})
      }
    }.title('闯关模式')
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack;
      try {
        this.gameTime = (context?.pathInfo?.param as PageParam)?.gameTime;
        this.templateIndex = (context?.pathInfo?.param as PageParam)?.templateIndex;
        this.showDigit = (context?.pathInfo?.param as PageParam)?.isShowDigit;
      } catch (e) {
        console.log(`testTag onReady catch exception: ${JSON.stringify(e)}`)
      }
    })
    .menus([
      {'value': "搜索", 'icon': "resources/base/media/rectangle_on_rectangle.svg", 'action': async () => {
        if (!this.isGameStart){
          if (this.numArray.length) {
            this.numArray=[]
          }
          this.numArray=await this.imageModel.getPictureFromAlbum(this.templateIndex+2)
        }
      }},
    ])
  }
}


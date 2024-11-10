import GameRules from "../model/GameRules";
import ImageModel from "../model/ImageModel";
import PictureItem from "../model/PictureItem";
import { SelectComponent } from "../View/SelectComponent";
import { photoAccessHelper } from "@kit.MediaLibraryKit";
import ImagePicker from "../common/ImagePicker";
import { abilityAccessCtrl, Permissions } from "@kit.AbilityKit";
import { ImageGridComponent } from "../View/ImageGridComponent";
import { beginButton, restartButton } from "../View/ButtonComponent";
import { TimerComponent } from "../View/TimerComponent";

@Builder
export function PageGameBuilder() {
  Game1()
}

const PERMISSIONS: Array<Permissions> = [
  'ohos.permission.READ_IMAGEVIDEO'
];

@Component
struct Game1 {
  @State numArray: PictureItem[] = [];
  @State imgData: Array<photoAccessHelper.PhotoAsset> = [];
  @State templateIndex: number = 1;
  @State @Watch('onImageChange') index: number = 0;
  @State showDigit:boolean =false;
  @State isPause: boolean =false;
  @State  gameTime: number = 300;
  @State timer: number = -1;
  @State isGameStart: boolean = false;
  @State game: GameRules = new GameRules();
  private ImageModel: ImageModel = new ImageModel(getContext(this));

  pageInfos: NavPathStack = new NavPathStack();


  dialogController: CustomDialogController = new CustomDialogController({
    builder: ImagePicker({
      imagesData: this.imgData,
      index: $index
    }),
    autoCancel: true,
    gridCount: 12
  })

  async aboutToAppear() {
    await abilityAccessCtrl.createAtManager().requestPermissionsFromUser(getContext(this), PERMISSIONS);
    this.imgData = await this.ImageModel.getAllImg();
    // Logger.info(Common.TAG, `images = ${this.imgData.length}`);
    this.numArray = await this.ImageModel.splitPic(0,this.templateIndex+2);
  }

  async onImageChange() {
    this.dialogController.close();
    this.numArray = [];
    this.numArray = await this.ImageModel.splitPic(this.index,this.templateIndex+2);
    this.init();
    this.isGameStart = false;
  }

  init() {
    this.gameTime = 300;
    clearInterval(this.timer);
  }

  @Builder
  ImageShow() {
    Image(this.imgData[this.index].uri)
      .id('imageShow')
      .width('90%')
      .height(260)
      .objectFit(ImageFit.Fill)
      .onClick(async () => {
        this.imgData = await this.ImageModel.getAllImg();
        setTimeout(() => {
          this.dialogController.open();
        }, 200);
      })
  }


  @Builder
  showOption(){
    Row(){
      SelectComponent({index: this.index,templateIndex:this.templateIndex,numArray:this.numArray,isGameStart:this.isGameStart})
      Button(!this.isPause ? '暂停':'恢复')
        .backgroundColor('#f5f5f5')
        .fontColor('#182431')
        .onClick(()=>{
          this.isPause = !this.isPause;
        })
      Button('显示数字')
        .backgroundColor('#f5f5f5')
        .fontColor('#182431')
        .onClick(()=>{
          this.showDigit=!this.showDigit;
        })
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceAround)
  }

  build() {
    NavDestination(){
      Column(){
        TimerComponent({gameTime:this.gameTime})
        Column(){
          if (this.imgData.length > 0) {
            this.ImageShow()
            ImageGridComponent({isGameStart:this.isGameStart,numArray:this.numArray,templateIndex:this.templateIndex,showDigit:this.showDigit,gameTime:this.gameTime,timer:this.timer,game:this.game,isPause:this.isPause})
          }
        }
        this.showOption()
        beginButton({gameTime:this.gameTime,isGameStart:this.isGameStart,numArray:this.numArray,timer:this.timer,game:this.game,isPause:this.isPause})
        restartButton({gameTime:this.gameTime,isGameStart:this.isGameStart,numArray:this.numArray,timer:this.timer,game:this.game,isPause:this.isPause,templateIndex:this.templateIndex,index:this.index})
      }
    }
    .title('普通模式')
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack;
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

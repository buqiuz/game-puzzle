import { GameData } from "../viewModel/GameData";
import { PageParam } from "../viewModel/PageParam";

@Builder
export function PageLevelBuilder() {
  Level()
}
@Component
struct Level{
  gameData: GameData =new GameData();
  pageInfos: NavPathStack = new NavPathStack();

  build() {
    NavDestination(){
      Column(){
        Grid() {
          ForEach(this.gameData.level, (level:string,index:number) => {
            GridItem() {
              Stack(){
                Image($r(this.gameData.image[index]))
                  .width(100)
                  .height(100)
                Text(level)
                  .width("100%")
                  .height(72)
                  // .backgroundColor('#FFFFFF')
                  .borderRadius(24)
                  .fontSize(16)
                  .fontWeight(500)
                  .textAlign(TextAlign.Center)
                  .margin({bottom:30})
              }
            }
            .onClick(()=>{
              let p =new PageParam(this.gameData.gameTime[index],this.gameData.templateIndex[index],this.gameData.isShowDigit[index])
              this.pageInfos.pushPathByName('Game2', p)
            })
          }, (item:number) => item.toString())
        }
        .padding(15)
        .columnsTemplate('1fr 2fr 1fr')
      }
    }
    .backgroundImage($r('app.media.background_1'))
    .backgroundImageSize(ImageSize.Cover)
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack;
    })
  }
}
import { NavigationData} from '../viewModel/NavigationData';


@Entry
@Component
struct Index {
  private navigationData: NavigationData = new NavigationData();
  private Pages: string[] = this.navigationData.pages;

  @State toolBarList: ToolbarItem[] = [
    {'value': "首页", 'icon': $r("app.media.flag"), 'action': ()=> {}},
    {'value': "收藏", 'icon': $r("app.media.star"), 'action': ()=> {}},
    {'value': "个人中心", 'icon': $r("app.media.person"), 'action': ()=> {
      this.pageInfos.pushPath({name:'Login'})
    }}
  ];

  pageInfos: NavPathStack = new NavPathStack();

  @Builder
  showPages(){
    List({ space: 12 }) {
      ForEach(this.Pages, (item:string) => {
        ListItem() {
          Text(this.navigationData.pagesName[item])
            .width("100%")
            .height(72)
            .backgroundColor('#FFFFFF')
            .borderRadius(24)
            .fontSize(16)
            .fontWeight(500)
            .textAlign(TextAlign.Center)
            .onClick(()=>{
              this.pageInfos.pushPath({ name: item})
            })
        }
      }, (item:number) => item.toString())
    }
    .width("90%")
    .margin({ top: 12 })
  }

  build() {
    Column() {
      Navigation(this.pageInfos) {
        TextInput({ placeholder: 'search...' })
          .width("90%")
          .height(40)
          .backgroundColor('#FFFFFF')

        this.showPages()

      }
      .title(this.navigationData.title)
      .mode(NavigationMode.Auto)
      .menus(this.navigationData.menuList)
      .toolbarConfiguration(this.toolBarList)
    }
    .height('100%')
    .width('100%')
    .backgroundColor('#F1F3F5')
  }
}
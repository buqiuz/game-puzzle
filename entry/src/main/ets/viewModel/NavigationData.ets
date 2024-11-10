@Observed
export class NavigationData {
  toolBarList: ToolbarItem[] = [
    {'value': "首页", 'icon': $r("app.media.flag"), 'action': ()=> {}},
    {'value': "收藏", 'icon': $r("app.media.star"), 'action': ()=> {}},
    {'value': "个人中心", 'icon': $r("app.media.person"), 'action': ()=> {}}
  ];
  menuList: NavigationMenuItem[] = [
    {'value': "搜索", 'icon': "resources/base/media/magnifyingglass.svg", 'action': ()=> {}},
    {'value': "分享", 'icon': "resources/base/media/share.svg", 'action': ()=> {}},
    {'value': "固定", 'icon': "resources/base/media/pin.svg", 'action': ()=> {}},
    {'value': "书签", 'icon': "resources/base/media/bookmark.svg", 'action': ()=> {}}
  ]

  pages: string[] = [
    'Game1',
    // 'Game2',
    // 'test',
    'Level'
  ]
  pagesName: Record<string, string> = {
    'Game1': '普通模式',
    // 'test': '123',
    'Level': '闯关模式'

  }
  title: string = '拼图游戏'
}
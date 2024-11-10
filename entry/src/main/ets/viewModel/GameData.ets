@Observed
export class GameData{

  level: string[] = [
    '关卡1',
    '关卡2',
    '关卡3',
    '关卡4',
    '关卡5',
    '关卡6',
    '关卡7',
    '关卡8',
    '关卡9',
    '关卡10',
    '关卡11',
    '关卡12',
    '关卡13',
    '关卡14',
    '关卡15',
  ]

  isShowDigit: boolean[] = [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
  ]
  templateIndex: number[] = [
    0,
    0,
    0,
    1,
    1,
    1,
    2,
    2,
    2,
    3,
    3,
    3,
    4,
    4,
    4,
  ]
  gameTime:number[] = [
    100, // 关卡1: 1分40秒
    120, // 关卡2: 2分钟
    140, // 关卡3: 2分20秒
    160, // 关卡4: 2分40秒
    180, // 关卡5: 3分钟
    200, // 关卡6: 3分20秒
    225, // 关卡7: 3分45秒
    250, // 关卡8: 4分10秒
    275, // 关卡9: 4分35秒
    300, // 关卡10: 5分钟
    350, // 关卡11: 5分50秒
    400, // 关卡12: 6分40秒
    450, // 关卡13: 7分30秒
    500, // 关卡14: 8分20秒
    550, // 关卡15: 9分10秒
    600, // 关卡16: 10分钟
  ]

  image: string[] = [
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
    'app.media.flag',
  ]
}
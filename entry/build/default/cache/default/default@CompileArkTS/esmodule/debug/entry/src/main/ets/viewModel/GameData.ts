@Observed
export class GameData {
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
    ];
    isShowDigit: boolean[] = [
        true, false, true, false, true, false, true, false, true, false, true, false, true, false, true,
    ];
    templateIndex: number[] = [
        0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4,
    ];
    gameTime: number[] = [
        100,
        120,
        140,
        160,
        180,
        200,
        225,
        250,
        275,
        300,
        350,
        400,
        450,
        500,
        550,
        600, // 关卡16: 10分钟
    ];
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
    ];
}

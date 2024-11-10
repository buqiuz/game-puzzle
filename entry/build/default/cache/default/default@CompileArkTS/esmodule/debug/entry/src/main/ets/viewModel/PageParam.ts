export class PageParam {
    constructor(_gameTime: number, _templateIndex: number, _isShowDigit: boolean) {
        this.gameTime = _gameTime;
        this.templateIndex = _templateIndex;
        this.isShowDigit = _isShowDigit;
    }
    gameTime: number = 10;
    templateIndex: number = 10;
    isShowDigit: boolean = true;
}

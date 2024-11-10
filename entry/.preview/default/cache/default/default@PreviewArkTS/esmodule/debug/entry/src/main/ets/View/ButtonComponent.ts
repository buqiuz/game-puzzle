if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface selectPictureButton_Params {
    isGameStart?: boolean;
    numArray?: PictureItem[];
    templateIndex?: number;
    ImageModel?: ImageModel;
}
interface beginButton_Params {
    isGameStart?: boolean;
    gameTime?: number;
    numArray?: PictureItem[];
    timer?: number;
    isPause?: boolean;
    game?: GameRules;
}
interface restartButton_Params {
    isGameStart?: boolean;
    gameTime?: number;
    numArray?: PictureItem[];
    timer?: number;
    game?: GameRules;
    isPause?: boolean;
    templateIndex?: number;
    index?: number;
    ImageModel?: ImageModel;
}
import type GameRules from "../model/GameRules";
import ImageModel from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/ImageModel";
import type PictureItem from "../model/PictureItem";
export class restartButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isGameStart = new SynchedPropertySimpleTwoWayPU(params.isGameStart, this, "isGameStart");
        this.__gameTime = new SynchedPropertySimpleTwoWayPU(params.gameTime, this, "gameTime");
        this.__numArray = new SynchedPropertyObjectTwoWayPU(params.numArray, this, "numArray");
        this.__timer = new SynchedPropertySimpleTwoWayPU(params.timer, this, "timer");
        this.__game = new SynchedPropertyObjectTwoWayPU(params.game, this, "game");
        this.__isPause = new SynchedPropertySimpleTwoWayPU(params.isPause, this, "isPause");
        this.__templateIndex = new SynchedPropertySimpleTwoWayPU(params.templateIndex, this, "templateIndex");
        this.__index = new SynchedPropertySimpleTwoWayPU(params.index, this, "index");
        this.ImageModel = new ImageModel(getContext(this));
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: restartButton_Params) {
        if (params.ImageModel !== undefined) {
            this.ImageModel = params.ImageModel;
        }
    }
    updateStateVars(params: restartButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__gameTime.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__timer.purgeDependencyOnElmtId(rmElmtId);
        this.__game.purgeDependencyOnElmtId(rmElmtId);
        this.__isPause.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isGameStart.aboutToBeDeleted();
        this.__gameTime.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__timer.aboutToBeDeleted();
        this.__game.aboutToBeDeleted();
        this.__isPause.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isGameStart: SynchedPropertySimpleTwoWayPU<boolean>;
    get isGameStart() {
        return this.__isGameStart.get();
    }
    set isGameStart(newValue: boolean) {
        this.__isGameStart.set(newValue);
    }
    private __gameTime: SynchedPropertySimpleTwoWayPU<number>;
    get gameTime() {
        return this.__gameTime.get();
    }
    set gameTime(newValue: number) {
        this.__gameTime.set(newValue);
    }
    private __numArray: SynchedPropertySimpleOneWayPU<PictureItem[]>;
    get numArray() {
        return this.__numArray.get();
    }
    set numArray(newValue: PictureItem[]) {
        this.__numArray.set(newValue);
    }
    private __timer: SynchedPropertySimpleTwoWayPU<number>;
    get timer() {
        return this.__timer.get();
    }
    set timer(newValue: number) {
        this.__timer.set(newValue);
    }
    private __game: SynchedPropertySimpleOneWayPU<GameRules>;
    get game() {
        return this.__game.get();
    }
    set game(newValue: GameRules) {
        this.__game.set(newValue);
    }
    private __isPause: SynchedPropertySimpleTwoWayPU<boolean>;
    get isPause() {
        return this.__isPause.get();
    }
    set isPause(newValue: boolean) {
        this.__isPause.set(newValue);
    }
    private __templateIndex: SynchedPropertySimpleTwoWayPU<number>;
    get templateIndex() {
        return this.__templateIndex.get();
    }
    set templateIndex(newValue: number) {
        this.__templateIndex.set(newValue);
    }
    private __index: SynchedPropertySimpleTwoWayPU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private ImageModel: ImageModel;
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
        }, 1000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重置', { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/View/ButtonComponent.ets(32:5)", "entry");
            Button.id('restart');
            Button.height({ "id": 16777219, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.width('90%');
            Button.fontSize({ "id": 16777218, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.margin({ top: 5 });
            Button.backgroundColor(this.isGameStart ? { "id": 16777240, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } : { "id": 16777242, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.enabled(this.isGameStart);
            Button.onClick(async () => {
                this.isGameStart = false;
                this.isPause = false;
                this.init();
                // this.start();
                // this.numArray = this.game.gameBegin(this.numArray);
                this.numArray = await this.ImageModel.splitPic(this.index, this.templateIndex + 2);
            });
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class beginButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isGameStart = new SynchedPropertySimpleTwoWayPU(params.isGameStart, this, "isGameStart");
        this.__gameTime = new SynchedPropertySimpleTwoWayPU(params.gameTime, this, "gameTime");
        this.__numArray = new SynchedPropertyObjectTwoWayPU(params.numArray, this, "numArray");
        this.__timer = new SynchedPropertySimpleTwoWayPU(params.timer, this, "timer");
        this.__isPause = new SynchedPropertySimpleTwoWayPU(params.isPause, this, "isPause");
        this.__game = new SynchedPropertyObjectTwoWayPU(params.game, this, "game");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: beginButton_Params) {
    }
    updateStateVars(params: beginButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__gameTime.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__timer.purgeDependencyOnElmtId(rmElmtId);
        this.__isPause.purgeDependencyOnElmtId(rmElmtId);
        this.__game.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isGameStart.aboutToBeDeleted();
        this.__gameTime.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__timer.aboutToBeDeleted();
        this.__isPause.aboutToBeDeleted();
        this.__game.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isGameStart: SynchedPropertySimpleTwoWayPU<boolean>;
    get isGameStart() {
        return this.__isGameStart.get();
    }
    set isGameStart(newValue: boolean) {
        this.__isGameStart.set(newValue);
    }
    private __gameTime: SynchedPropertySimpleTwoWayPU<number>;
    get gameTime() {
        return this.__gameTime.get();
    }
    set gameTime(newValue: number) {
        this.__gameTime.set(newValue);
    }
    private __numArray: SynchedPropertySimpleOneWayPU<PictureItem[]>;
    get numArray() {
        return this.__numArray.get();
    }
    set numArray(newValue: PictureItem[]) {
        this.__numArray.set(newValue);
    }
    private __timer: SynchedPropertySimpleTwoWayPU<number>;
    get timer() {
        return this.__timer.get();
    }
    set timer(newValue: number) {
        this.__timer.set(newValue);
    }
    private __isPause: SynchedPropertySimpleTwoWayPU<boolean>;
    get isPause() {
        return this.__isPause.get();
    }
    set isPause(newValue: boolean) {
        this.__isPause.set(newValue);
    }
    private __game: SynchedPropertySimpleOneWayPU<GameRules>;
    get game() {
        return this.__game.get();
    }
    set game(newValue: GameRules) {
        this.__game.set(newValue);
    }
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
        }, 1000);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777238, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" }, { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/View/ButtonComponent.ets(76:5)", "entry");
            Button.id('begin');
            Button.height({ "id": 16777219, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.width('90%');
            Button.fontSize({ "id": 16777218, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.margin({ top: 5 });
            Button.backgroundColor(this.isGameStart ? { "id": 16777242, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } : { "id": 16777240, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.enabled(!this.isGameStart && this.numArray.length > 0);
            Button.onClick(() => {
                this.isGameStart = true;
                this.isPause = false;
                this.start();
                this.numArray = this.game.gameBegin(ObservedObject.GetRawObject(this.numArray));
            });
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class selectPictureButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isGameStart = new SynchedPropertySimpleTwoWayPU(params.isGameStart, this, "isGameStart");
        this.__numArray = new SynchedPropertyObjectTwoWayPU(params.numArray, this, "numArray");
        this.__templateIndex = new SynchedPropertySimpleTwoWayPU(params.templateIndex, this, "templateIndex");
        this.ImageModel = new ImageModel(getContext(this));
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: selectPictureButton_Params) {
        if (params.ImageModel !== undefined) {
            this.ImageModel = params.ImageModel;
        }
    }
    updateStateVars(params: selectPictureButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isGameStart.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isGameStart: SynchedPropertySimpleTwoWayPU<boolean>;
    get isGameStart() {
        return this.__isGameStart.get();
    }
    set isGameStart(newValue: boolean) {
        this.__isGameStart.set(newValue);
    }
    private __numArray: SynchedPropertySimpleOneWayPU<PictureItem[]>;
    get numArray() {
        return this.__numArray.get();
    }
    set numArray(newValue: PictureItem[]) {
        this.__numArray.set(newValue);
    }
    private __templateIndex: SynchedPropertySimpleTwoWayPU<number>;
    get templateIndex() {
        return this.__templateIndex.get();
    }
    set templateIndex(newValue: number) {
        this.__templateIndex.set(newValue);
    }
    private ImageModel: ImageModel;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('从图库选择', { type: ButtonType.Capsule, stateEffect: true });
            Button.debugLine("entry/src/main/ets/View/ButtonComponent.ets(100:5)", "entry");
            Button.id('selectPicture');
            Button.fontSize({ "id": 16777218, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.margin({ top: 20 });
            Button.backgroundColor('#f5f5f5');
            Button.fontColor('#182431');
            Button.enabled(!this.isGameStart);
            Button.onClick(async () => {
                if (!this.isGameStart) {
                    if (this.numArray.length) {
                        this.numArray = [];
                    }
                    this.numArray = await this.ImageModel.getPictureFromAlbum(this.templateIndex + 2);
                }
            });
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

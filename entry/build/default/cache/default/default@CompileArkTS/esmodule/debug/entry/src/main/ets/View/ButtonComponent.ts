if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface recoveryButton_Params {
    isGameStart?: boolean;
    numArray?: PictureItem[];
    templateIndex?: number;
    game?: GameRules;
    ImageModel?: ImageModel;
    gameTime?: number;
    timer?: number;
    buttonWidth?: string;
    startState?: number[];
    path?: number[] | null;
    // private ImageModel: ImageModel = new ImageModel(getContext(this));
    dialogControllerImage?: CustomDialogController;
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
import type ImageModel from "../model/ImageModel";
import type PictureItem from "../model/PictureItem";
import PuzzleSolver from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/PuzzleSolver";
import { TipsDialog } from "@ohos:arkui.advanced.Dialog";
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
        this.__ImageModel = new SynchedPropertyObjectTwoWayPU(params.ImageModel, this, "ImageModel");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: restartButton_Params) {
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
        this.__ImageModel.purgeDependencyOnElmtId(rmElmtId);
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
        this.__ImageModel.aboutToBeDeleted();
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
    private __ImageModel: SynchedPropertySimpleOneWayPU<ImageModel>;
    get ImageModel() {
        return this.__ImageModel.get();
    }
    set ImageModel(newValue: ImageModel) {
        this.__ImageModel.set(newValue);
    }
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
            Button.id('restart');
            Button.width('30%');
            Button.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.margin({ top: 5 });
            Button.backgroundColor(this.isGameStart ? { "id": 16777227, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } : { "id": 16777229, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.enabled(this.isGameStart);
            Button.onClick(async () => {
                this.isGameStart = false;
                this.isPause = false;
                this.init();
                // this.start();
                // this.numArray = this.game.gameBegin(this.numArray);
                if (this.numArray) {
                    this.numArray = [];
                }
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
            Button.createWithLabel({ "id": 16777225, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" }, { type: ButtonType.Capsule, stateEffect: true });
            Button.id('begin');
            Button.height({ "id": 16777233, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.width('90%');
            Button.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.margin({ top: 5 });
            Button.backgroundColor(this.isGameStart ? { "id": 16777229, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } : { "id": 16777227, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
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
        this.__ImageModel = new SynchedPropertyObjectTwoWayPU(params.ImageModel, this, "ImageModel");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: selectPictureButton_Params) {
    }
    updateStateVars(params: selectPictureButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__ImageModel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isGameStart.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        this.__ImageModel.aboutToBeDeleted();
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
    private __ImageModel: SynchedPropertySimpleOneWayPU<ImageModel>;
    get ImageModel() {
        return this.__ImageModel.get();
    }
    set ImageModel(newValue: ImageModel) {
        this.__ImageModel.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('从图库选择', { type: ButtonType.Capsule, stateEffect: true });
            Button.id('selectPicture');
            Button.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
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
export class recoveryButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isGameStart = new SynchedPropertySimpleTwoWayPU(params.isGameStart, this, "isGameStart");
        this.__numArray = new SynchedPropertyObjectTwoWayPU(params.numArray, this, "numArray");
        this.__templateIndex = new SynchedPropertySimpleTwoWayPU(params.templateIndex, this, "templateIndex");
        this.__game = new SynchedPropertyObjectTwoWayPU(params.game, this, "game");
        this.__ImageModel = new SynchedPropertyObjectTwoWayPU(params.ImageModel, this, "ImageModel");
        this.__gameTime = new SynchedPropertySimpleTwoWayPU(params.gameTime, this, "gameTime");
        this.__timer = new SynchedPropertySimpleTwoWayPU(params.timer, this, "timer");
        this.buttonWidth = '30%';
        this.startState = [];
        this.path = [];
        this.dialogControllerImage = new CustomDialogController({
            builder: () => {
                let jsDialog = new TipsDialog(this, {
                    imageRes: { "id": 16777256, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                    imageSize: { width: '100vp', height: '100vp' },
                    content: '恭喜你完成拼图',
                    primaryButton: {
                        value: '确定',
                        action: () => {
                            this.isGameStart = false;
                        },
                    },
                    onCheckedChange: () => {
                        console.info('Callback when the checkbox is clicked');
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/View/ButtonComponent.ets", line: 140, col: 14 });
                jsDialog.setController(this.
                // private ImageModel: ImageModel = new ImageModel(getContext(this));
                dialogControllerImage);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        imageRes: { "id": 16777256, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                        imageSize: { width: '100vp', height: '100vp' },
                        content: '恭喜你完成拼图',
                        primaryButton: {
                            value: '确定',
                            action: () => {
                                this.isGameStart = false;
                            },
                        },
                        onCheckedChange: () => {
                            console.info('Callback when the checkbox is clicked');
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            }
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: recoveryButton_Params) {
        if (params.buttonWidth !== undefined) {
            this.buttonWidth = params.buttonWidth;
        }
        if (params.startState !== undefined) {
            this.startState = params.startState;
        }
        if (params.path !== undefined) {
            this.path = params.path;
        }
        if (params.dialogControllerImage !== undefined) {
            this.dialogControllerImage = params.dialogControllerImage;
        }
    }
    updateStateVars(params: recoveryButton_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__game.purgeDependencyOnElmtId(rmElmtId);
        this.__ImageModel.purgeDependencyOnElmtId(rmElmtId);
        this.__gameTime.purgeDependencyOnElmtId(rmElmtId);
        this.__timer.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isGameStart.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        this.__game.aboutToBeDeleted();
        this.__ImageModel.aboutToBeDeleted();
        this.__gameTime.aboutToBeDeleted();
        this.__timer.aboutToBeDeleted();
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
    private __game: SynchedPropertySimpleOneWayPU<GameRules>;
    get game() {
        return this.__game.get();
    }
    set game(newValue: GameRules) {
        this.__game.set(newValue);
    }
    private __ImageModel: SynchedPropertySimpleOneWayPU<ImageModel>;
    get ImageModel() {
        return this.__ImageModel.get();
    }
    set ImageModel(newValue: ImageModel) {
        this.__ImageModel.set(newValue);
    }
    private __gameTime: SynchedPropertySimpleTwoWayPU<number>;
    get gameTime() {
        return this.__gameTime.get();
    }
    set gameTime(newValue: number) {
        this.__gameTime.set(newValue);
    }
    private __timer: SynchedPropertySimpleTwoWayPU<number>;
    get timer() {
        return this.__timer.get();
    }
    set timer(newValue: number) {
        this.__timer.set(newValue);
    }
    private buttonWidth: string;
    private startState: number[];
    private path: number[] | null;
    // private ImageModel: ImageModel = new ImageModel(getContext(this));
    private dialogControllerImage: CustomDialogController;
    initStartState() {
        if (this.startState.length) {
            this.startState = [];
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
    gameOver() {
        let count = 0;
        let loop = (this.templateIndex + 2) * (this.templateIndex + 2) - 1;
        for (let i = 0; i < loop; i++) {
            if (this.numArray[i].index === i) {
                count++;
            }
            else {
                count = 0;
                break;
            }
        }
        if (count === loop) {
            this.isGameStart = false;
            this.dialogControllerImage.open();
            clearInterval(this.timer);
            this.gameTime = 300;
        }
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
            this.gameOver();
            // this.gameOver;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('自动复原', { type: ButtonType.Capsule, stateEffect: true });
            Button.id('selectPicture');
            Button.width(this.buttonWidth);
            Button.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.margin({ top: 5 });
            Button.backgroundColor(this.isGameStart ? { "id": 16777227, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } : { "id": 16777229, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.enabled(this.isGameStart);
            Button.onClick(async () => {
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
                    }
                    else {
                        console.error("未找到解决方案。");
                    }
                }
                catch (error) {
                    console.error("运行 aStar 时出错:", error);
                }
            });
        }, Button);
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

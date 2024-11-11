if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ImageGridComponent_Params {
    templateIndex?: number;
    numArray?: PictureItem[];
    isGameStart?: boolean;
    gameTime?: number;
    showDigit?: boolean;
    timer?: number;
    game?: GameRules;
    isPause?: boolean;
    template?: string[];
    dialogControllerImage?: CustomDialogController;
}
import type GameRules from "../model/GameRules";
import type PictureItem from "../model/PictureItem";
import { TipsDialog } from "@ohos:arkui.advanced.Dialog";
export class ImageGridComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__templateIndex = new SynchedPropertySimpleTwoWayPU(params.templateIndex, this, "templateIndex");
        this.__numArray = new SynchedPropertyObjectTwoWayPU(params.numArray, this, "numArray");
        this.__isGameStart = new SynchedPropertySimpleTwoWayPU(params.isGameStart, this, "isGameStart");
        this.__gameTime = new SynchedPropertySimpleTwoWayPU(params.gameTime, this, "gameTime");
        this.__showDigit = new SynchedPropertySimpleTwoWayPU(params.showDigit, this, "showDigit");
        this.__timer = new SynchedPropertySimpleTwoWayPU(params.timer, this, "timer");
        this.__game = new SynchedPropertyObjectTwoWayPU(params.game, this, "game");
        this.__isPause = new SynchedPropertySimpleTwoWayPU(params.isPause, this, "isPause");
        this.template = ['1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr', '1fr 1fr 1fr 1fr 1fr', '1fr 1fr 1fr 1fr 1fr 1fr'];
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
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/View/ImageGridComponent.ets", line: 20, col: 14 });
                jsDialog.setController(this.dialogControllerImage);
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
        this.declareWatch("gameTime", this.onTimeOver);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ImageGridComponent_Params) {
        if (params.template !== undefined) {
            this.template = params.template;
        }
        if (params.dialogControllerImage !== undefined) {
            this.dialogControllerImage = params.dialogControllerImage;
        }
    }
    updateStateVars(params: ImageGridComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__gameTime.purgeDependencyOnElmtId(rmElmtId);
        this.__showDigit.purgeDependencyOnElmtId(rmElmtId);
        this.__timer.purgeDependencyOnElmtId(rmElmtId);
        this.__game.purgeDependencyOnElmtId(rmElmtId);
        this.__isPause.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__templateIndex.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__isGameStart.aboutToBeDeleted();
        this.__gameTime.aboutToBeDeleted();
        this.__showDigit.aboutToBeDeleted();
        this.__timer.aboutToBeDeleted();
        this.__game.aboutToBeDeleted();
        this.__isPause.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __templateIndex: SynchedPropertySimpleTwoWayPU<number>;
    get templateIndex() {
        return this.__templateIndex.get();
    }
    set templateIndex(newValue: number) {
        this.__templateIndex.set(newValue);
    }
    private __numArray: SynchedPropertySimpleOneWayPU<PictureItem[]>;
    get numArray() {
        return this.__numArray.get();
    }
    set numArray(newValue: PictureItem[]) {
        this.__numArray.set(newValue);
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
    private __showDigit: SynchedPropertySimpleTwoWayPU<boolean>;
    get showDigit() {
        return this.__showDigit.get();
    }
    set showDigit(newValue: boolean) {
        this.__showDigit.set(newValue);
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
    private template: string[];
    private dialogControllerImage: CustomDialogController;
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
    onTimeOver() {
        if (this.gameTime === 0) {
            this.isGameStart = false;
            AlertDialog.show({ message: 'TimeOver' });
            clearInterval(this.timer);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.id('imageGrid');
            Grid.rowsTemplate(this.template[this.templateIndex]);
            Grid.columnsTemplate(this.template[this.templateIndex]);
            Grid.columnsGap({ "id": 16777234, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Grid.rowsGap({ "id": 16777234, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Grid.width(350);
            Grid.height(260);
            Grid.margin({ left: 0, top: 5 });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.id(`image${index}`);
                        GridItem.backgroundColor(item.pixelMap === undefined ? { "id": 16777228, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } : { "id": 16777230, "type": 10001, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                        GridItem.onClick(() => {
                            if (this.isGameStart && !this.isPause) {
                                this.numArray = this.game.gameInit(index, ObservedObject.GetRawObject(this.numArray));
                                this.gameOver();
                            }
                        });
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Stack.create();
                        }, Stack);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.pixelMap);
                            Image.width(350 / (this.templateIndex + 2));
                            Image.objectFit(ImageFit.Fill);
                            Image.height(260 / (this.templateIndex + 2));
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (this.showDigit) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create((item.index + 1).toString());
                                        Text.fontColor(Color.Yellow);
                                    }, Text);
                                    Text.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        Stack.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.numArray, forEachItemGenFunction, (item: PictureItem) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

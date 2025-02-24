if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Game1_Params {
    numArray?: PictureItem[];
    imgData?: Array<photoAccessHelper.PhotoAsset>;
    templateIndex?: number;
    index?: number;
    showDigit?: boolean;
    isPause?: boolean;
    gameTime?: number;
    timer?: number;
    isGameStart?: boolean;
    game?: GameRules;
    imageModel?: ImageModel;
    pageInfos?: NavPathStack;
    dialogController?: CustomDialogController;
}
import GameRules from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/GameRules";
import ImageModel from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/ImageModel";
import type PictureItem from "../model/PictureItem";
import { SelectComponent } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/SelectComponent";
import type photoAccessHelper from "@ohos:file.photoAccessHelper";
import ImagePicker from "@bundle:ohos.samples.gamepuzzle/entry/ets/common/ImagePicker";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import { ImageGridComponent } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/ImageGridComponent";
import { beginButton, recoveryButton, restartButton } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/ButtonComponent";
import { TimerComponent } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/TimerComponent";
export function PageGameBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Game1(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 14, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Game1" });
    }
}
const PERMISSIONS: Array<Permissions> = [
    'ohos.permission.READ_IMAGEVIDEO'
];
class Game1 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__numArray = new ObservedPropertyObjectPU([], this, "numArray");
        this.__imgData = new ObservedPropertyObjectPU([], this, "imgData");
        this.__templateIndex = new ObservedPropertySimplePU(1, this, "templateIndex");
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.__showDigit = new ObservedPropertySimplePU(false, this, "showDigit");
        this.__isPause = new ObservedPropertySimplePU(false, this, "isPause");
        this.__gameTime = new ObservedPropertySimplePU(300, this, "gameTime");
        this.__timer = new ObservedPropertySimplePU(-1, this, "timer");
        this.__isGameStart = new ObservedPropertySimplePU(false, this, "isGameStart");
        this.__game = new ObservedPropertyObjectPU(new GameRules(), this, "game");
        this.__imageModel = new ObservedPropertyObjectPU(new ImageModel(getContext(this)), this, "imageModel");
        this.pageInfos = new NavPathStack();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ImagePicker(this, {
                    imagesData: this.imgData,
                    index: this.__index
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 39, col: 14 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        imagesData: this.imgData,
                        index: this.__index
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: true,
            gridCount: 12
        }, this);
        this.setInitiallyProvidedValue(params);
        this.declareWatch("index", this.onImageChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Game1_Params) {
        if (params.numArray !== undefined) {
            this.numArray = params.numArray;
        }
        if (params.imgData !== undefined) {
            this.imgData = params.imgData;
        }
        if (params.templateIndex !== undefined) {
            this.templateIndex = params.templateIndex;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.showDigit !== undefined) {
            this.showDigit = params.showDigit;
        }
        if (params.isPause !== undefined) {
            this.isPause = params.isPause;
        }
        if (params.gameTime !== undefined) {
            this.gameTime = params.gameTime;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.isGameStart !== undefined) {
            this.isGameStart = params.isGameStart;
        }
        if (params.game !== undefined) {
            this.game = params.game;
        }
        if (params.imageModel !== undefined) {
            this.imageModel = params.imageModel;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: Game1_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__imgData.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__showDigit.purgeDependencyOnElmtId(rmElmtId);
        this.__isPause.purgeDependencyOnElmtId(rmElmtId);
        this.__gameTime.purgeDependencyOnElmtId(rmElmtId);
        this.__timer.purgeDependencyOnElmtId(rmElmtId);
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__game.purgeDependencyOnElmtId(rmElmtId);
        this.__imageModel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__numArray.aboutToBeDeleted();
        this.__imgData.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__showDigit.aboutToBeDeleted();
        this.__isPause.aboutToBeDeleted();
        this.__gameTime.aboutToBeDeleted();
        this.__timer.aboutToBeDeleted();
        this.__isGameStart.aboutToBeDeleted();
        this.__game.aboutToBeDeleted();
        this.__imageModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __numArray: ObservedPropertyObjectPU<PictureItem[]>;
    get numArray() {
        return this.__numArray.get();
    }
    set numArray(newValue: PictureItem[]) {
        this.__numArray.set(newValue);
    }
    private __imgData: ObservedPropertyObjectPU<Array<photoAccessHelper.PhotoAsset>>;
    get imgData() {
        return this.__imgData.get();
    }
    set imgData(newValue: Array<photoAccessHelper.PhotoAsset>) {
        this.__imgData.set(newValue);
    }
    private __templateIndex: ObservedPropertySimplePU<number>;
    get templateIndex() {
        return this.__templateIndex.get();
    }
    set templateIndex(newValue: number) {
        this.__templateIndex.set(newValue);
    }
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __showDigit: ObservedPropertySimplePU<boolean>;
    get showDigit() {
        return this.__showDigit.get();
    }
    set showDigit(newValue: boolean) {
        this.__showDigit.set(newValue);
    }
    private __isPause: ObservedPropertySimplePU<boolean>;
    get isPause() {
        return this.__isPause.get();
    }
    set isPause(newValue: boolean) {
        this.__isPause.set(newValue);
    }
    private __gameTime: ObservedPropertySimplePU<number>;
    get gameTime() {
        return this.__gameTime.get();
    }
    set gameTime(newValue: number) {
        this.__gameTime.set(newValue);
    }
    private __timer: ObservedPropertySimplePU<number>;
    get timer() {
        return this.__timer.get();
    }
    set timer(newValue: number) {
        this.__timer.set(newValue);
    }
    private __isGameStart: ObservedPropertySimplePU<boolean>;
    get isGameStart() {
        return this.__isGameStart.get();
    }
    set isGameStart(newValue: boolean) {
        this.__isGameStart.set(newValue);
    }
    private __game: ObservedPropertyObjectPU<GameRules>;
    get game() {
        return this.__game.get();
    }
    set game(newValue: GameRules) {
        this.__game.set(newValue);
    }
    private __imageModel: ObservedPropertyObjectPU<ImageModel>;
    get imageModel() {
        return this.__imageModel.get();
    }
    set imageModel(newValue: ImageModel) {
        this.__imageModel.set(newValue);
    }
    private pageInfos: NavPathStack;
    private dialogController: CustomDialogController;
    async aboutToAppear() {
        await abilityAccessCtrl.createAtManager().requestPermissionsFromUser(getContext(this), PERMISSIONS);
        this.imgData = await this.imageModel.getAllImg();
        // Logger.info(Common.TAG, `images = ${this.imgData.length}`);
        this.numArray = await this.imageModel.splitPic(0, this.templateIndex + 2);
    }
    async onImageChange() {
        this.dialogController.close();
        this.numArray = [];
        this.numArray = await this.imageModel.splitPic(this.index, this.templateIndex + 2);
        this.init();
        this.isGameStart = false;
    }
    init() {
        this.gameTime = 300;
        clearInterval(this.timer);
    }
    ImageShow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imgData[this.index].uri);
            Image.id('imageShow');
            Image.width('90%');
            Image.height(260);
            Image.objectFit(ImageFit.Fill);
            Image.onClick(async () => {
                this.imgData = await this.imageModel.getAllImg();
                setTimeout(() => {
                    this.dialogController.open();
                }, 200);
            });
        }, Image);
    }
    showOption(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SelectComponent(this, { index: this.__index, templateIndex: this.__templateIndex, numArray: this.__numArray, isGameStart: this.__isGameStart }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 86, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            index: this.index,
                            templateIndex: this.templateIndex,
                            numArray: this.numArray,
                            isGameStart: this.isGameStart
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SelectComponent" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(!this.isPause ? '暂停' : '恢复');
            Button.backgroundColor('#f5f5f5');
            Button.fontColor('#182431');
            Button.onClick(() => {
                this.isPause = !this.isPause;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('显示数字');
            Button.backgroundColor('#f5f5f5');
            Button.fontColor('#182431');
            Button.onClick(() => {
                this.showDigit = !this.showDigit;
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TimerComponent(this, { gameTime: this.__gameTime }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 107, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    gameTime: this.gameTime
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "TimerComponent" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.imgData.length > 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.ImageShow.bind(this)();
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new ImageGridComponent(this, { isGameStart: this.__isGameStart, numArray: this.__numArray, templateIndex: this.__templateIndex, showDigit: this.__showDigit, gameTime: this.__gameTime, timer: this.__timer, game: this.__game, isPause: this.__isPause }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 111, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                isGameStart: this.isGameStart,
                                                numArray: this.numArray,
                                                templateIndex: this.templateIndex,
                                                showDigit: this.showDigit,
                                                gameTime: this.gameTime,
                                                timer: this.timer,
                                                game: this.game,
                                                isPause: this.isPause
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "ImageGridComponent" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
                this.showOption.bind(this)();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new beginButton(this, { gameTime: this.__gameTime, isGameStart: this.__isGameStart, numArray: this.__numArray, timer: this.__timer, game: this.__game, isPause: this.__isPause }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 115, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    gameTime: this.gameTime,
                                    isGameStart: this.isGameStart,
                                    numArray: this.numArray,
                                    timer: this.timer,
                                    game: this.game,
                                    isPause: this.isPause
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "beginButton" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('90%');
                    Row.justifyContent(FlexAlign.SpaceAround);
                }, Row);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new restartButton(this, { gameTime: this.__gameTime, isGameStart: this.__isGameStart, numArray: this.__numArray, timer: this.__timer, game: this.__game, isPause: this.__isPause, templateIndex: this.__templateIndex, index: this.__index, ImageModel: this.__imageModel }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 117, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    gameTime: this.gameTime,
                                    isGameStart: this.isGameStart,
                                    numArray: this.numArray,
                                    timer: this.timer,
                                    game: this.game,
                                    isPause: this.isPause,
                                    templateIndex: this.templateIndex,
                                    index: this.index,
                                    ImageModel: this.imageModel
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "restartButton" });
                }
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new recoveryButton(this, { ImageModel: this.__imageModel, game: this.__game, gameTime: this.__gameTime, isGameStart: this.__isGameStart, numArray: this.__numArray, templateIndex: this.__templateIndex, timer: this.__timer, buttonWidth: '30%' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game1.ets", line: 118, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    ImageModel: this.imageModel,
                                    game: this.game,
                                    gameTime: this.gameTime,
                                    isGameStart: this.isGameStart,
                                    numArray: this.numArray,
                                    templateIndex: this.templateIndex,
                                    timer: this.timer,
                                    buttonWidth: '30%'
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "recoveryButton" });
                }
                Row.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Game1" });
            NavDestination.title('普通模式');
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
            });
            NavDestination.menus([
                { 'value': "图库中选择图片", 'icon': "resources/base/media/rectangle_on_rectangle.svg", 'action': async () => {
                        if (!this.isGameStart) {
                            if (this.numArray.length) {
                                this.numArray = [];
                            }
                            this.numArray = await this.imageModel.getPictureFromAlbum(this.templateIndex + 2);
                        }
                    } },
            ]);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("Game1", wrapBuilder(PageGameBuilder));
    }
})();

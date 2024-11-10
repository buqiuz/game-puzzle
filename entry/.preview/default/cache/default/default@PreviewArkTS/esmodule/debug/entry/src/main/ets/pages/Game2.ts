if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Game2_Params {
    numArray?: PictureItem[];
    templateIndex?: number;
    showDigit?: boolean;
    gameTime?: number;
    timer?: number;
    isPause?: boolean;
    isGameStart?: boolean;
    game?: GameRules;
    pageInfos?: NavPathStack;
}
import type PictureItem from "../model/PictureItem";
import { ImageGridComponent } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/ImageGridComponent";
import { ImageSelectComponent } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/ImageSelectComponent";
import GameRules from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/GameRules";
import { beginButton, selectPictureButton } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/ButtonComponent";
import { TimerComponent } from "@bundle:ohos.samples.gamepuzzle/entry/ets/View/TimerComponent";
import type { PageParam } from "../viewModel/PageParam";
export function PageGameBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Game2(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game2.ets", line: 12, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Game2" });
    }
}
class Game2 extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__numArray = new ObservedPropertyObjectPU([], this, "numArray");
        this.__templateIndex = new ObservedPropertySimplePU(1, this, "templateIndex");
        this.__showDigit = new ObservedPropertySimplePU(false, this, "showDigit");
        this.__gameTime = new ObservedPropertySimplePU(200, this, "gameTime");
        this.__timer = new ObservedPropertySimplePU(-1, this, "timer");
        this.__isPause = new ObservedPropertySimplePU(false, this, "isPause");
        this.__isGameStart = new ObservedPropertySimplePU(false, this, "isGameStart");
        this.__game = new ObservedPropertyObjectPU(new GameRules(), this, "game");
        this.pageInfos = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Game2_Params) {
        if (params.numArray !== undefined) {
            this.numArray = params.numArray;
        }
        if (params.templateIndex !== undefined) {
            this.templateIndex = params.templateIndex;
        }
        if (params.showDigit !== undefined) {
            this.showDigit = params.showDigit;
        }
        if (params.gameTime !== undefined) {
            this.gameTime = params.gameTime;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.isPause !== undefined) {
            this.isPause = params.isPause;
        }
        if (params.isGameStart !== undefined) {
            this.isGameStart = params.isGameStart;
        }
        if (params.game !== undefined) {
            this.game = params.game;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: Game2_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__showDigit.purgeDependencyOnElmtId(rmElmtId);
        this.__gameTime.purgeDependencyOnElmtId(rmElmtId);
        this.__timer.purgeDependencyOnElmtId(rmElmtId);
        this.__isPause.purgeDependencyOnElmtId(rmElmtId);
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__game.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__numArray.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        this.__showDigit.aboutToBeDeleted();
        this.__gameTime.aboutToBeDeleted();
        this.__timer.aboutToBeDeleted();
        this.__isPause.aboutToBeDeleted();
        this.__isGameStart.aboutToBeDeleted();
        this.__game.aboutToBeDeleted();
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
    private __templateIndex: ObservedPropertySimplePU<number>;
    get templateIndex() {
        return this.__templateIndex.get();
    }
    set templateIndex(newValue: number) {
        this.__templateIndex.set(newValue);
    }
    private __showDigit: ObservedPropertySimplePU<boolean>;
    get showDigit() {
        return this.__showDigit.get();
    }
    set showDigit(newValue: boolean) {
        this.__showDigit.set(newValue);
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
    private __isPause: ObservedPropertySimplePU<boolean>;
    get isPause() {
        return this.__isPause.get();
    }
    set isPause(newValue: boolean) {
        this.__isPause.set(newValue);
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
    private pageInfos: NavPathStack;
    async aboutToAppear() {
        // await abilityAccessCtrl.createAtManager().requestPermissionsFromUser(getContext(this), PERMISSIONS);
        // this.imgData = await this.ImageModel.getAllImg();
        // Logger.info(Common.TAG, `images = ${this.imgData.length}`);
        // this.numArray = await this.ImageModel.splitPic(0,this.templateIndex+2);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Game2.ets(37:7)", "entry");
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TimerComponent(this, { gameTime: this.__gameTime }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game2.ets", line: 38, col: 9 });
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
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ImageSelectComponent(this, { templateIndex: this.__templateIndex, numArray: this.__numArray, isGameStart: this.__isGameStart }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game2.ets", line: 39, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
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
                    }, { name: "ImageSelectComponent" });
                }
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ImageGridComponent(this, { isGameStart: this.__isGameStart, numArray: this.__numArray, templateIndex: this.__templateIndex, showDigit: this.__showDigit, gameTime: this.__gameTime, timer: this.__timer, game: this.__game, isPause: this.__isPause }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game2.ets", line: 40, col: 9 });
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
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Game2.ets(42:9)", "entry");
                    Column.height('10%');
                }, Column);
                Column.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new beginButton(this, { gameTime: this.__gameTime, isGameStart: this.__isGameStart, numArray: this.__numArray, timer: this.__timer, game: this.__game, isPause: this.__isPause }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game2.ets", line: 46, col: 9 });
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
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new selectPictureButton(this, { isGameStart: this.__isGameStart, numArray: this.__numArray, templateIndex: this.__templateIndex }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Game2.ets", line: 47, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    isGameStart: this.isGameStart,
                                    numArray: this.numArray,
                                    templateIndex: this.templateIndex
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "selectPictureButton" });
                }
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Game2" });
            NavDestination.title('闯关模式');
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
                try {
                    this.gameTime = (context?.pathInfo?.param as PageParam)?.gameTime;
                    this.templateIndex = (context?.pathInfo?.param as PageParam)?.templateIndex;
                    this.showDigit = (context?.pathInfo?.param as PageParam)?.isShowDigit;
                }
                catch (e) {
                    console.log(`testTag onReady catch exception: ${JSON.stringify(e)}`);
                }
            });
            NavDestination.debugLine("entry/src/main/ets/pages/Game2.ets(36:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("Game2", wrapBuilder(PageGameBuilder));
    }
})();

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Level_Params {
    gameData?: GameData;
    pageInfos?: NavPathStack;
}
import { GameData } from "@bundle:ohos.samples.gamepuzzle/entry/ets/viewModel/GameData";
import { PageParam } from "@bundle:ohos.samples.gamepuzzle/entry/ets/viewModel/PageParam";
export function PageLevelBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new Level(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Level.ets", line: 6, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Level" });
    }
}
class Level extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.gameData = new GameData();
        this.pageInfos = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Level_Params) {
        if (params.gameData !== undefined) {
            this.gameData = params.gameData;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: Level_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private gameData: GameData;
    private pageInfos: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/pages/Level.ets(15:7)", "entry");
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Grid.create();
                    Grid.debugLine("entry/src/main/ets/pages/Level.ets(16:9)", "entry");
                    Grid.padding(15);
                    Grid.columnsTemplate('1fr 2fr 1fr');
                }, Grid);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const level = _item;
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                GridItem.create(() => { }, false);
                                GridItem.onClick(() => {
                                    let p = new PageParam(this.gameData.gameTime[index], this.gameData.templateIndex[index], this.gameData.isShowDigit[index]);
                                    this.pageInfos.pushPathByName('Game2', p);
                                });
                                GridItem.debugLine("entry/src/main/ets/pages/Level.ets(18:13)", "entry");
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Stack.create();
                                    Stack.debugLine("entry/src/main/ets/pages/Level.ets(19:15)", "entry");
                                }, Stack);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": -1, "type": -1, params: [this.gameData.image[index]], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                                    Image.debugLine("entry/src/main/ets/pages/Level.ets(20:17)", "entry");
                                    Image.width(100);
                                    Image.height(100);
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(level);
                                    Text.debugLine("entry/src/main/ets/pages/Level.ets(23:17)", "entry");
                                    Text.width("100%");
                                    Text.height(72);
                                    Text.borderRadius(24);
                                    Text.fontSize(16);
                                    Text.fontWeight(500);
                                    Text.textAlign(TextAlign.Center);
                                    Text.margin({ bottom: 30 });
                                }, Text);
                                Text.pop();
                                Stack.pop();
                                GridItem.pop();
                            };
                            observedDeepRender();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.gameData.level, forEachItemGenFunction, (item: number) => item.toString(), true, false);
                }, ForEach);
                ForEach.pop();
                Grid.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Level" });
            NavDestination.backgroundImage({ "id": 16777254, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            NavDestination.backgroundImageSize(ImageSize.Cover);
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
            });
            NavDestination.debugLine("entry/src/main/ets/pages/Level.ets(14:5)", "entry");
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("Level", wrapBuilder(PageLevelBuilder));
    }
})();

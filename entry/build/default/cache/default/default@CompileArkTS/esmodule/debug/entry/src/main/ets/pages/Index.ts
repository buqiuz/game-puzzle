if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    navigationData?: NavigationData;
    Pages?: string[];
    toolBarList?: ToolbarItem[];
    pageInfos?: NavPathStack;
}
import { NavigationData } from "@bundle:ohos.samples.gamepuzzle/entry/ets/viewModel/NavigationData";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.navigationData = new NavigationData();
        this.Pages = this.navigationData.pages;
        this.__toolBarList = new ObservedPropertyObjectPU([
            { 'value': "首页", 'icon': { "id": 16777245, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" }, 'action': () => { } },
            { 'value': "收藏", 'icon': { "id": 16777251, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" }, 'action': () => { } },
            { 'value': "个人中心", 'icon': { "id": 16777248, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" }, 'action': () => {
                    this.pageInfos.pushPath({ name: 'Login' });
                } }
        ], this, "toolBarList");
        this.pageInfos = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.navigationData !== undefined) {
            this.navigationData = params.navigationData;
        }
        if (params.Pages !== undefined) {
            this.Pages = params.Pages;
        }
        if (params.toolBarList !== undefined) {
            this.toolBarList = params.toolBarList;
        }
        if (params.pageInfos !== undefined) {
            this.pageInfos = params.pageInfos;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__toolBarList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__toolBarList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private navigationData: NavigationData;
    private Pages: string[];
    private __toolBarList: ObservedPropertyObjectPU<ToolbarItem[]>;
    get toolBarList() {
        return this.__toolBarList.get();
    }
    set toolBarList(newValue: ToolbarItem[]) {
        this.__toolBarList.set(newValue);
    }
    private pageInfos: NavPathStack;
    showPages(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12 });
            List.width("90%");
            List.margin({ top: 12 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.navigationData.pagesName[item]);
                            Text.width("100%");
                            Text.height(72);
                            Text.backgroundColor('#FFFFFF');
                            Text.borderRadius(24);
                            Text.fontSize(16);
                            Text.fontWeight(500);
                            Text.textAlign(TextAlign.Center);
                            Text.onClick(() => {
                                this.pageInfos.pushPath({ name: item });
                            });
                        }, Text);
                        Text.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.Pages, forEachItemGenFunction, (item: number) => item.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageInfos, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.title(this.navigationData.title);
            Navigation.mode(NavigationMode.Auto);
            Navigation.menus(this.navigationData.menuList);
            Navigation.toolbarConfiguration(ObservedObject.GetRawObject(this.toolBarList));
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: 'search...' });
            TextInput.width("90%");
            TextInput.height(40);
            TextInput.backgroundColor('#FFFFFF');
        }, TextInput);
        this.showPages.bind(this)();
        Navigation.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "ohos.samples.gamepuzzle", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });

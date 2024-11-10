if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ImagePicker_Params {
    index?: number;
    selected?: number;
    imagesData?: Array<photoAccessHelper.PhotoAsset>;
    controller?: CustomDialogController;
}
import type photoAccessHelper from "@ohos:file.photoAccessHelper";
import { CommonConstants as Common } from "@bundle:ohos.samples.gamepuzzle/entry/ets/common/CommonConstants";
export default class ImagePicker extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__index = new SynchedPropertySimpleTwoWayPU(params.index, this, "index");
        this.__selected = new ObservedPropertySimplePU(Common.ZERO, this, "selected");
        this.imagesData = [];
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ImagePicker_Params) {
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.imagesData !== undefined) {
            this.imagesData = params.imagesData;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: ImagePicker_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__selected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__selected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __index: SynchedPropertySimpleTwoWayPU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __selected: ObservedPropertySimplePU<number>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: number) {
        this.__selected.set(newValue);
    }
    private imagesData: Array<photoAccessHelper.PhotoAsset>;
    public controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    aboutToAppear() {
        this.selected = this.index;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/common/ImagePicker.ets(31:5)", "entry");
            Column.width(Common.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: Common.LIST_SPACE });
            List.debugLine("entry/src/main/ets/common/ImagePicker.ets(32:7)", "entry");
            List.width(Common.LIST_WIDTH);
            List.height({ "id": 16777226, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            List.listDirection(Axis.Horizontal);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
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
                        ListItem.debugLine("entry/src/main/ets/common/ImagePicker.ets(34:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Stack.create({ alignContent: Alignment.TopEnd });
                            Stack.debugLine("entry/src/main/ets/common/ImagePicker.ets(35:13)", "entry");
                        }, Stack);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.uri);
                            Image.debugLine("entry/src/main/ets/common/ImagePicker.ets(36:15)", "entry");
                            Image.width({ "id": 16777225, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                            Image.height({ "id": 16777224, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
                            Image.margin({
                                left: { "id": 16777228, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                                right: { "id": 16777228, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                                top: { "id": 16777229, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" },
                                bottom: { "id": 16777229, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" }
                            });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Radio.create({ value: Common.RADIO_VALUE, group: Common.RADIO_GROUP });
                            Radio.debugLine("entry/src/main/ets/common/ImagePicker.ets(45:15)", "entry");
                            Radio.id(`radio${this.selected + Common.ONE}_${index + Common.ONE}`);
                            Radio.checked(index === this.selected ? true : false);
                            Radio.onChange(() => {
                                this.selected = index;
                            });
                        }, Radio);
                        Stack.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.imagesData, forEachItemGenFunction, (item: photoAccessHelper.PhotoAsset) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/common/ImagePicker.ets(59:7)", "entry");
            Row.margin({ bottom: { "id": 16777227, "type": 10002, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777234, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/common/ImagePicker.ets(60:9)", "entry");
            Button.id(Common.CANCEL_BUTTON);
            Button.margin({ right: Common.BUTTON_MARGIN });
            Button.onClick(() => {
                this.controller.close();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777239, "type": 10003, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/common/ImagePicker.ets(66:9)", "entry");
            Button.id(Common.CONFIRM_BUTTON);
            Button.onClick(() => {
                this.index = this.selected;
                this.controller.close();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

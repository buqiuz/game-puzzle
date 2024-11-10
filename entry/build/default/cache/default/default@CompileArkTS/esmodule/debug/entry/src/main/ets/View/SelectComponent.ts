if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SelectComponent_Params {
    index?: number;
    templateIndex?: number;
    numArray?: PictureItem[];
    isGameStart?: boolean;
    text?: string;
    space?: number;
    arrowPosition?: ArrowPosition;
    ImageModel?: ImageModel;
}
import ImageModel from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/ImageModel";
import type PictureItem from "../model/PictureItem";
export class SelectComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__index = new SynchedPropertySimpleTwoWayPU(params.index, this, "index");
        this.__templateIndex = new SynchedPropertySimpleTwoWayPU(params.templateIndex, this, "templateIndex");
        this.__numArray = new SynchedPropertyObjectTwoWayPU(params.numArray, this, "numArray");
        this.__isGameStart = new SynchedPropertySimpleTwoWayPU(params.isGameStart, this, "isGameStart");
        this.__text = new ObservedPropertySimplePU("难度选择", this, "text");
        this.__space = new ObservedPropertySimplePU(8, this, "space");
        this.__arrowPosition = new ObservedPropertySimplePU(ArrowPosition.END, this, "arrowPosition");
        this.ImageModel = new ImageModel(getContext(this));
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SelectComponent_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.space !== undefined) {
            this.space = params.space;
        }
        if (params.arrowPosition !== undefined) {
            this.arrowPosition = params.arrowPosition;
        }
        if (params.ImageModel !== undefined) {
            this.ImageModel = params.ImageModel;
        }
    }
    updateStateVars(params: SelectComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__space.purgeDependencyOnElmtId(rmElmtId);
        this.__arrowPosition.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__index.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__isGameStart.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__space.aboutToBeDeleted();
        this.__arrowPosition.aboutToBeDeleted();
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
    private __text: ObservedPropertySimplePU<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __space: ObservedPropertySimplePU<number>;
    get space() {
        return this.__space.get();
    }
    set space(newValue: number) {
        this.__space.set(newValue);
    }
    private __arrowPosition: ObservedPropertySimplePU<ArrowPosition>;
    get arrowPosition() {
        return this.__arrowPosition.get();
    }
    set arrowPosition(newValue: ArrowPosition) {
        this.__arrowPosition.set(newValue);
    }
    private ImageModel: ImageModel;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([{ value: '2 x 2', icon: { "id": 16777245, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } },
                { value: '3 x 3', icon: { "id": 16777245, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } },
                { value: '4 x 4', icon: { "id": 16777245, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } },
                { value: '5 x 5', icon: { "id": 16777245, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } },
                { value: '6 x 6', icon: { "id": 16777245, "type": 20000, params: [], "bundleName": "ohos.samples.gamepuzzle", "moduleName": "entry" } }]);
            Select.selected(this.index);
            Select.value(this.text);
            Select.font({ size: 16, weight: 500 });
            Select.fontColor('#182431');
            Select.selectedOptionFont({ size: 16, weight: 400 });
            Select.optionFont({ size: 16, weight: 400 });
            Select.space(this.space);
            Select.arrowPosition(this.arrowPosition);
            Select.menuAlign(MenuAlignType.START, { dx: 0, dy: 0 });
            Select.optionWidth(200);
            Select.optionHeight(300);
            Select.enabled(!this.isGameStart);
            Select.onSelect(async (index: number, text?: string | undefined) => {
                console.info('Select:' + index);
                if (this.numArray.length) {
                    this.numArray = [];
                }
                this.templateIndex = index;
                this.numArray = await this.ImageModel.splitPic(this.index, this.templateIndex + 2);
                this.isGameStart = false;
            });
        }, Select);
        Select.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ImageSelectComponent_Params {
    imgData?: Array<photoAccessHelper.PhotoAsset>;
    numArray?: PictureItem[];
    templateIndex?: number;
    isGameStart?: boolean;
    ImageModel?: ImageModel;
}
import type photoAccessHelper from "@ohos:file.photoAccessHelper";
import ImageModel from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/ImageModel";
import type PictureItem from "../model/PictureItem";
export class ImageSelectComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__imgData = new ObservedPropertyObjectPU([], this, "imgData");
        this.__numArray = new SynchedPropertyObjectTwoWayPU(params.numArray, this, "numArray");
        this.__templateIndex = new SynchedPropertySimpleTwoWayPU(params.templateIndex, this, "templateIndex");
        this.__isGameStart = new SynchedPropertySimpleTwoWayPU(params.isGameStart, this, "isGameStart");
        this.ImageModel = new ImageModel(getContext(this));
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ImageSelectComponent_Params) {
        if (params.imgData !== undefined) {
            this.imgData = params.imgData;
        }
        if (params.ImageModel !== undefined) {
            this.ImageModel = params.ImageModel;
        }
    }
    updateStateVars(params: ImageSelectComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__imgData.purgeDependencyOnElmtId(rmElmtId);
        this.__numArray.purgeDependencyOnElmtId(rmElmtId);
        this.__templateIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isGameStart.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__imgData.aboutToBeDeleted();
        this.__numArray.aboutToBeDeleted();
        this.__templateIndex.aboutToBeDeleted();
        this.__isGameStart.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __imgData: ObservedPropertyObjectPU<Array<photoAccessHelper.PhotoAsset>>;
    get imgData() {
        return this.__imgData.get();
    }
    set imgData(newValue: Array<photoAccessHelper.PhotoAsset>) {
        this.__imgData.set(newValue);
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
    private __isGameStart: SynchedPropertySimpleTwoWayPU<boolean>;
    get isGameStart() {
        return this.__isGameStart.get();
    }
    set isGameStart(newValue: boolean) {
        this.__isGameStart.set(newValue);
    }
    private ImageModel: ImageModel;
    async aboutToAppear() {
        this.imgData = await this.ImageModel.getAllImg();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 5 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.width('90%');
            Grid.height('25%');
            Grid.rowsTemplate('1fr');
            Grid.rowsGap(15);
            Grid.margin({
                bottom: 20
            });
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index < 9) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    GridItem.create(() => { }, false);
                                    GridItem.margin({ right: 10 });
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, GridItem);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(item.uri);
                                        Image.onClick(async () => {
                                            if (!this.isGameStart) {
                                                if (this.numArray.length) {
                                                    this.numArray = [];
                                                }
                                                this.numArray = await this.ImageModel.splitPic(index, this.templateIndex + 2);
                                            }
                                        });
                                    }, Image);
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.imgData, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

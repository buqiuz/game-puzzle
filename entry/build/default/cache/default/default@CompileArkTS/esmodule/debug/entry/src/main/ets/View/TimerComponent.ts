if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TimerComponent_Params {
    gameTime?: number;
}
export class TimerComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__gameTime = new SynchedPropertySimpleTwoWayPU(params.gameTime, this, "gameTime");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TimerComponent_Params) {
    }
    updateStateVars(params: TimerComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__gameTime.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__gameTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __gameTime: SynchedPropertySimpleTwoWayPU<number>;
    get gameTime() {
        return this.__gameTime.get();
    }
    set gameTime(newValue: number) {
        this.__gameTime.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`Time:0${Math.floor(this.gameTime / 60)}:${this.gameTime % 60 < 10
                ? 0 + this.gameTime % 60 : this.gameTime % 60}`);
            Text.id('time');
            Text.margin({ top: 5, bottom: 5 });
            Text.fontColor(Color.Blue);
            Text.fontWeight(600);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

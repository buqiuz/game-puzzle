import AbilityStage from "@ohos:app.ability.AbilityStage";
import Logger from "@bundle:ohos.samples.gamepuzzle/entry/ets/model/Logger";
export default class MyAbilityStage extends AbilityStage {
    onCreate() {
        Logger.info('MyAbilityStage', 'onCreate');
    }
}

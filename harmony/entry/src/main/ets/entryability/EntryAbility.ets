import { RNAbility } from "@rnoh/react-native-openharmony";
import Want from "@ohos.app.ability.Want";
import { UPRNSDKImpl } from "../rn/UPReactView";


export default class EntryAbility extends RNAbility {
  protected getPagePath(): string {
    return 'pages/Index';
  }

  protected getRNOHWorkerScriptUrl() {
    return "entry/ets/workers/RNOHWorker.ets";
  }

  rnSDK: UPRNSDKImpl | undefined = undefined;

  onCreate(want: Want): void {
    super.onCreate(want);
    this.rnSDK = new UPRNSDKImpl(this.context, want)
    AppStorage.setOrCreate('UPRNSDK', this.rnSDK);
  }

  onDestroy(): void {
    super.onDestroy();
    AppStorage.delete('UPRNSDK');
  }
}
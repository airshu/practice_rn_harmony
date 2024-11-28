import { RNInfo, UPReactView, UPRNSDK } from "../rn/UPReactView";

@Entry
@Component
export struct RNPage {
  rnInfo: RNInfo = { businessId: 'practice_rn_harmony', bundlePath: 'bundle.harmony.js', isFromMetro: false };
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;

  onBackPress(): boolean | void {
    this.rnSdk?.onBackPress();
  }

  build() {
    Stack() {
      UPReactView({
        rnInfo: this.rnInfo
      })
    }.width('100%').height('100%')
  }
}
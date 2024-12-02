import { RNAbility } from "@rnoh/react-native-openharmony";
import Want from "@ohos.app.ability.Want";
import { UPRNSDKImpl } from "../rn/UPReactView";
import { window } from "@kit.ArkUI";
import { BusinessError } from "@ohos.base";


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

  getDeviceSize(context: Context, area: window.AvoidArea, naviBarArea: window.AvoidArea): void {
    // Get device height.
    window.getLastWindow(context).then((data: window.Window) => {
      let properties = data.getWindowProperties();
      // 便于在布局中对具体控件布局避让遮挡的区域。
      AppStorage.setOrCreate<number>('statusBarHeight', px2vp(area.topRect.height));
      AppStorage.setOrCreate<number>('naviIndicatorHeight', px2vp(naviBarArea.bottomRect.height));
      AppStorage.setOrCreate<number>('deviceHeight', px2vp(properties.windowRect.height));
      AppStorage.setOrCreate<number>('deviceWidth', px2vp(properties.windowRect.width));
    });
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    super.onWindowStageCreate(windowStage);

    this.requestFullScreen(windowStage, this.context);
  }

  public requestFullScreen(windowStage: window.WindowStage, context: Context): void {
    windowStage.getMainWindow((err: BusinessError, data: window.Window) => {
      if (err.code) {
        console.error('Failed to obtain the main window. Cause: ' + JSON.stringify(err));
        return;
      }
      let windowClass: window.Window = data;
      console.info('Succeeded in obtaining the main window. Data: ' + JSON.stringify(data));

      // Realize the immersive effect
      let isLayoutFullScreen = true;
      try {
        // Get status bar height.
        // 使用getWindowAvoidArea()接口获取布局遮挡区域（例如状态栏、导航条）
        let area: window.AvoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
        let naviBarArea: window.AvoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR); // 导航条避让
        console.info('Succeeded get the window navigation indicator HEIGHT: ' + px2vp(naviBarArea.bottomRect.height) + ' area: ' +
        JSON.stringify(naviBarArea));
        this.getDeviceSize(context, area, naviBarArea);
        if (area.topRect.height > 0) {
          // 设置为true表示由组件模块控制忽略状态栏、导航栏的沉浸式全屏布局
          let promise: Promise<void> = windowClass.setWindowLayoutFullScreen(isLayoutFullScreen);
          promise.then(() => {
            console.info('Succeeded in setting the window layout to full-screen mode.');
          }).catch((err: BusinessError) => {
            console.error('Failed to set the window layout to full-screen mode. Cause:' + JSON.stringify(err));
          });
        }
      } catch {
        console.error('Failed to set the window layout to full-screen mode. ');
      }
    });
  }
}
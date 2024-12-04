import { MaskedView, MASKED_VIEW_TYPE } from '@react-native-oh-tpl/masked-view';
import { RNCSlider, SLIDER_TYPE } from '@react-native-oh-tpl/slider';
import {
  ResourceJSBundleProvider,
  RNInstance,
  RNOHCoreContext,
  RNOHContext,
  RNComponentContext,
  MetroJSBundleProvider,
  ComponentBuilderContext,
  CustomRNComponentFrameNodeFactory,
  buildRNComponentForTag,
} from '@rnoh/react-native-openharmony';
import { createRNPackages } from '../RNPackagesFactory';
// import { createRNPackages } from './RNPackagesFactory'

// import { RNCViewPager, PAGER_VIEW_TYPE } from '@react-native-oh-tpl/react-native-pager-view'
// import { MarqueeView } from '../customView/MarqueeView'
import { ENABLE_CAPI_ARCHITECTURE } from './config';

// 混合方案，需要添加组件名
export const arkTsComponentNames = [
  SLIDER_TYPE,
  // MASKED_VIEW_TYPE,
]; //MarqueeView.NAME

// 引入自定义组件
@Builder
export function buildCustomComponent(ctx: ComponentBuilderContext) {
  if (ctx.componentName == SLIDER_TYPE) {
    RNCSlider({
      ctx: ctx.rnComponentContext,
      tag: ctx.tag,
    })
  }
  // if(ctx.componentName == MASKED_VIEW_TYPE) {
  //   MaskedView({
  //     ctx: ctx.rnComponentContext,
  //     tag: ctx.tag
  //   })
  // }
  Stack() {
    // if (ctx.componentName === PAGER_VIEW_TYPE) {
    //   RNCViewPager({
    //     ctx: ctx.rnComponentContext,
    //     tag: ctx.tag,
    //     buildCustomComponent: buildCustomComponent
    //   })
    // }
    // else if (ctx.componentName === MarqueeView.NAME) {
    //   MarqueeView({
    //     ctx: ctx.rnComponentContext,
    //     tag: ctx.tag
    //   })
    // }
  }
  .position({ x: 0, y: 0 })
}

export class LoadManager {
  // 记录已加载的bundle
  private static loadedBundle: Set<string> = new Set();
  public static metroInstance: RNInstance
  public static cpInstance: RNInstance
  public static bpInstance: RNInstance
  private static shouldResetMetroInstance: Boolean = true
  static ctx: RNComponentContext;

  public static loadBundle(instance: RNInstance, bundlePath: string, useBundleCache: boolean = true): Promise<void> {
    if (LoadManager.loadedBundle.has(bundlePath) && useBundleCache) {
      return Promise.resolve();
    }
    if (useBundleCache) {
      LoadManager.loadedBundle.add(bundlePath);
    }

    return instance.runJSBundle(new ResourceJSBundleProvider(getContext().resourceManager, bundlePath));
  }

  public static async loadMetroBundle(uiContext: UIContext): Promise<boolean> {
    const rnohCoreContext: RNOHCoreContext | undefined = AppStorage.get('RNOHCoreContext')
    if (LoadManager.shouldResetMetroInstance && rnohCoreContext) {
      LoadManager.metroInstance = await rnohCoreContext.createAndRegisterRNInstance({
        createRNPackages: createRNPackages,
        enableNDKTextMeasuring: true,
        enableBackgroundExecutor: false,
        enableCAPIArchitecture: ENABLE_CAPI_ARCHITECTURE,
        arkTsComponentNames: arkTsComponentNames
      });
      LoadManager.ctx = new RNComponentContext(
        RNOHContext.fromCoreContext(rnohCoreContext!, LoadManager.metroInstance),
        wrapBuilder(buildCustomComponent),
        wrapBuilder(buildRNComponentForTag),
        new Map()
      );

      const provider = new MetroJSBundleProvider()
      await LoadManager.metroInstance.runJSBundle(provider)

      const jsBundleExecutionStatus: string = LoadManager.metroInstance.getBundleExecutionStatus(provider.getURL()) as string
      console.log("SampleApp --- getBundleExecutionStatus", jsBundleExecutionStatus);
      LoadManager.shouldResetMetroInstance = false
      if (jsBundleExecutionStatus === "DONE") {
        return true
      } else {
        return false
      }
    }
    return true
  }

  public static resetLoadedData() {
    LoadManager.loadedBundle.clear()
    LoadManager.shouldResetMetroInstance = true
    const rnohCoreContext: RNOHCoreContext | undefined = AppStorage.get('RNOHCoreContext')
  }
}


export const myFontResourceByFontFamily:Record<string, Resource | string> = {
  'antoutline': $rawfile("fonts/antoutline.ttf"),
  "antfill": $rawfile('fonts/antfill.ttf'),
  'anticon': $rawfile('fonts/AntDesign.ttf'),
  'Entypo': $rawfile('fonts/Entypo.ttf'),
  'EvilIcons': $rawfile('fonts/EvilIcons.ttf'),
  'Feather': $rawfile('fonts/Feather.ttf'),
  'FontAwesome': $rawfile('fonts/FontAwesome.ttf'),
  'FontAwesome5Brands-Regular': $rawfile('fonts/FontAwesome5_Brands.ttf'),
  'FontAwesome5Free-Regular': $rawfile('fonts/FontAwesome5_Regular.ttf'),
  'FontAwesome5Free-Solid': $rawfile('fonts/FontAwesome5_Solid.ttf'),
  'FontAwesome6Brands-Regular': $rawfile('fonts/FontAwesome6_Brands.ttf'),
  'FontAwesome6Free-Regular': $rawfile('fonts/FontAwesome6_Regular.ttf'),
  'FontAwesome6Free-Solid': $rawfile('fonts/FontAwesome6_Solid.ttf'),
  'Fontisto': $rawfile('fonts/Fontisto.ttf'),
  'fontcustom': $rawfile('fonts/Foundation.ttf'),
  'Ionicons': $rawfile('fonts/Ionicons.ttf'),
  'Material Design Icons': $rawfile('fonts/MaterialCommunityIcons.ttf'),
  'Material Icons': $rawfile('fonts/MaterialIcons.ttf'),
  'Octicons': $rawfile('fonts/Octicons.ttf'),
  'simple-line-icons': $rawfile('fonts/SimpleLineIcons.ttf'),
  'zocial': $rawfile('fonts/Zocial.ttf'),

}
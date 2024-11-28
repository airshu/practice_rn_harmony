import { RNInstance, ResourceJSBundleProvider, RNSurface, ComponentBuilderContext, RNAbility, RNOHCoreContext, RNComponentContext, RNOHContext, buildRNComponentForTag,
  RNInstanceOptions,
  RNInstancesCoordinator,
  RNOHLogger,
  StandardRNOHLogger} from "@rnoh/react-native-openharmony";
import { common, EnvironmentCallback, Want } from '@kit.AbilityKit';
import { createRNPackages } from "../RNPackagesFactory";
import { BusinessError } from "@kit.BasicServicesKit";
import { DefaultHttpClient, HttpClient } from "@rnoh/react-native-openharmony/src/main/ets/HttpClient";

@Builder
export function buildCustomComponent(ctx: ComponentBuilderContext) { }


export class RNInfo {
  public businessId: string = ''
  public bundlePath: string = ''
  public isFromMetro: boolean = false;
}

export interface UPRNSDK {
  abilityContext: common.UIAbilityContext;

  createAndRegisterRNInstance(options: RNInstanceOptions): Promise<RNInstance>

  // createRNOHContext({rnInstance}: { rnInstance: RNInstance }): RNOHContext;

  onBackPress(): boolean;
}

@Entry
@Component
export struct UPReactView {
  rnInfo!: RNInfo;
  @StorageLink('UPRNSDK') rnSdk: UPRNSDK | undefined = undefined;
  private rnInstance!: RNInstance
  @State isBundleReady: boolean = false;
  @StorageLink('RNAbility') private rnAbility: RNAbility = {} as RNAbility
  private rnohCoreContext: RNOHCoreContext | undefined = AppStorage.get('RNOHCoreContext')
  @Builder public buildCustomComponent(ctx: ComponentBuilderContext) {}

  async aboutToAppear() {
    if (this.rnSdk) {
      this.rnInstance = await this.rnohCoreContext!.createAndRegisterRNInstance({
        createRNPackages: createRNPackages,
        enableNDKTextMeasuring: true,
        enableBackgroundExecutor: false,
        enableCAPIArchitecture: true,
        arkTsComponentNames: []
      });
      await this.rnInstance.runJSBundle(new ResourceJSBundleProvider(this.rnohCoreContext!.uiAbilityContext.resourceManager, this.rnInfo.bundlePath)).then(() => {
        this.isBundleReady = true
      })
    }
  }

  build() {
    Row() {
      Column() {
        if (this.isBundleReady) {
          RNSurface({
            ctx: new RNComponentContext(
              RNOHContext.fromCoreContext(this.rnohCoreContext!, this.rnInstance),
              wrapBuilder(buildCustomComponent),
              wrapBuilder(buildRNComponentForTag),
              new Map()
            ),
            surfaceConfig: {
              appKey: this.rnInfo.businessId,
            },
          })
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}




export class UPRNSDKImpl{
  private context:common.UIAbilityContext | null = null;
  protected isDebugModeEnabled_: boolean = true
  private rnInstancesCoordinator!: RNInstancesCoordinator
  private logger!: RNOHLogger

  constructor(context: common.UIAbilityContext, want: Want) {
    this.context = context;
    let envCallback: EnvironmentCallback = {
      onConfigurationUpdated(config) {
        let fontSizeScale = config.fontSizeScale
        AppStorage.setOrCreate('fontSizeScale', fontSizeScale)
      },
      onMemoryLevel(level) {
        console.log('onMemoryLevel level: ${level}');
      }
    };
    try {
      let applicationContext = this.context.getApplicationContext();
      let callbackId = applicationContext.on('environment', envCallback);
      console.log(`callbackId: ${callbackId}`);
    } catch (paramError) {
      console.error(`error: ${(paramError as BusinessError).code}, ${(paramError as BusinessError).message}`);
    }
    this.logger = this.createLogger().clone("RNAbility")
    this.rnInstancesCoordinator = RNInstancesCoordinator.create({
      fontSizeScale: this.context.config.fontSizeScale,
      logger: this.createLogger(),
      uiAbilityContext: this.context,
      defaultBackPressHandler: () => {
        this.defaultBackPressHandler()
      },
    }, {
      launchURI: want.uri, onGetPackagerClientConfig: (buildMode) => buildMode === "DEBUG" ? {
        host: "localhost",
        port: 8081
      } : undefined,
      defaultHttpClient: this.onCreateDefaultHttpClient()
    })
    AppStorage.setOrCreate('RNOHCoreContext', this.rnInstancesCoordinator.getRNOHCoreContext())
  }

  protected createLogger(): RNOHLogger {
    return new StandardRNOHLogger();
  }

  onBackPress() {
    const stopTracing = this.logger.clone("onBackPress").startTracing()
    stopTracing()
    return true;
  }
  /**
   * Invoked when the React application doesn't handle the device back press.
   */
  protected defaultBackPressHandler() {
    this.context?.terminateSelf()
  }

  /**
   * @returns HttpClient shared by RNInstances
   */
  protected onCreateDefaultHttpClient(): undefined | HttpClient {
    return new DefaultHttpClient({logger: this.logger});
  }

}

import { RNPackage, AnyThreadTurboModuleFactory } from '@rnoh/react-native-openharmony/ts';
import type { AnyThreadTurboModule, AnyThreadTurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import { CalculatorModule } from './modules/CalculatorModule';
import { TurboModule, TurboModulesFactory, UITurboModuleContext } from '@rnoh/react-native-openharmony';
import { CalculatorWorkerModule } from './modules/CalculatorWorkerModule';
import { SampleTurboModule } from './modules/SampleTurboModule';
import { SampleTurboWorkerModule } from './modules/SampleTurboWorkerModule';

class GeneratedTurboModulesFactory extends AnyThreadTurboModuleFactory {
  createTurboModule(name: string): AnyThreadTurboModule | null {
    if (name === TM.RTNCalculator.NAME) {
      return new CalculatorWorkerModule(this.ctx);
    } else if (name === TM.SampleTurboModule.NAME) {
      return new SampleTurboWorkerModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === TM.RTNCalculator.NAME || name === TM.SampleTurboModule.NAME;
  }
}

class GeneratedWorkerTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === TM.RTNCalculator.NAME) {
      return new CalculatorModule(this.ctx);
    } else if (name === TM.SampleTurboModule.NAME) {
      return new SampleTurboModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === TM.RTNCalculator.NAME || name === TM.SampleTurboModule.NAME;
  }
}

export class GeneratedPackage extends RNPackage {
  createAnyThreadTurboModuleFactory(ctx: AnyThreadTurboModuleContext): AnyThreadTurboModuleFactory {
    return new GeneratedTurboModulesFactory(ctx);
  }

  createTurboModulesFactory(ctx: UITurboModuleContext): TurboModulesFactory {
    return new GeneratedWorkerTurboModulesFactory(ctx);
  }
}


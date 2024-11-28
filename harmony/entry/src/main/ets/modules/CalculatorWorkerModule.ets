import { AnyThreadTurboModule } from '@rnoh/react-native-openharmony';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';

/// 自定义Module
export class CalculatorWorkerModule extends AnyThreadTurboModule implements TM.RTNCalculator.Spec {
  add(a: number, b: number): Promise<number> {
    console.log('CalculatorModule.add', a, b);
    return Promise.resolve(a + b);
  }
}
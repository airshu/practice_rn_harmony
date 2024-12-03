import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';

export class CalculatorModule extends TurboModule implements TM.RTNCalculator.Spec {
  add(a: number, b: number): Promise<number> {
    return Promise.resolve(a + b);
  }
}

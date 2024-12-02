import { TM } from '@rnoh/react-native-openharmony/generated';
import { TurboModule } from '@rnoh/react-native-openharmony/ts';

export class SampleTurboModule extends TurboModule implements TM.SampleTurboModule.Spec {
  add(a: number, b: number): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(a + b);
    });
  }

  test(): void {
    console.log('SampleTurboModule.test');
  }
}
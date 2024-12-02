import { TM } from '@rnoh/react-native-openharmony/generated';
import { AnyThreadTurboModule } from '@rnoh/react-native-openharmony/src/main/ets/RNOH/TurboModule';

export class SampleTurboWorkerModule extends AnyThreadTurboModule implements TM.SampleTurboModule.Spec {
  add(a: number, b: number): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(a + b);
    });
  }

  test(): void {
    console.log('SampleTurboModule.test');
  }
}
import { TurboModule, TurboModuleRegistry } from "react-native";




export interface SpecSampleTurboModule extends TurboModule{
  add(a: number, b: number): Promise<number>;
  test(): void;
}

export default TurboModuleRegistry.getEnforcing<SpecSampleTurboModule>('SampleTurboModule')
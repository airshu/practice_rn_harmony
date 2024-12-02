import { TurboModule, TurboModuleRegistry } from "react-native";




export interface Spec extends TurboModule{
  add(a: number, b: number): Promise<number>;
  test(): void;
}

// 范型对应的接口名需要使用Spec
export default TurboModuleRegistry.getEnforcing<Spec>('SampleTurboModule')
import {TurboModuleRegistry, TurboModule} from 'react-native';

export interface RTNCalculator extends TurboModule {
  add(a: number, b: number): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<RTNCalculator>('RTNCalculator');

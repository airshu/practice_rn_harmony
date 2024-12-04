
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';


export interface Spec extends TurboModule {
    // getRandomValues:(array) => void
    getRandomBase64: (byteLength: number) => void;
    
}   
 
export default TurboModuleRegistry.get<Spec>('GetRandomValuesNativeModule') as Spec | null;
import { setupRNOHWorker } from '@rnoh/react-native-openharmony';
import { createRNPackages } from '../RNPackagesFactory';

setupRNOHWorker({
  createWorkerRNInstanceConfig: (_rnInstanceName) => {
    return { thirdPartyPackagesFactory: createRNPackages }
  }
})
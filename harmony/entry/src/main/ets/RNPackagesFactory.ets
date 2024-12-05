import { RNPackage, RNPackageContext } from "@rnoh/react-native-openharmony/ts";
import { GeneratedPackage } from "./GeneratedPackage";
import {RNDeviceInfoPackage} from '@react-native-oh-tpl/react-native-device-info/ts';
import {NetInfoPackage} from '@react-native-oh-tpl/netinfo/ts';
import { AsyncStoragePackage } from "@react-native-oh-tpl/async-storage";
import { SafeAreaViewPackage } from "@react-native-oh-tpl/react-native-safe-area-context/ts";
import { GestureHandlerPackage } from '@react-native-oh-tpl/react-native-gesture-handler/ts';
import { ReanimatedPackage } from '@react-native-oh-tpl/react-native-reanimated/ts';
import { RNGetRandomValuesPackage } from "@react-native-oh-tpl/react-native-get-random-values/ts";
import {FastImagePackage} from '@react-native-oh-tpl/react-native-fast-image/ts';


// 创建自定义的RNPackage
export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
    new RNDeviceInfoPackage(ctx),
    new NetInfoPackage(ctx),
    new AsyncStoragePackage(ctx),
    new SafeAreaViewPackage(ctx),
    new GestureHandlerPackage(ctx),
    new ReanimatedPackage(ctx),
    new RNGetRandomValuesPackage(ctx),
    new FastImagePackage(ctx),
  ];
}
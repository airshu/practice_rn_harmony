import { RNPackage, RNPackageContext } from "@rnoh/react-native-openharmony";
import { GeneratedPackage } from "./GeneratedPackage";
import {RNDeviceInfoPackage} from '@react-native-oh-tpl/react-native-device-info/ts';
import {NetInfoPackage} from '@react-native-oh-tpl/netinfo/ts';
import { AsyncStoragePackage } from "@react-native-oh-tpl/async-storage";


// 创建自定义的RNPackage
export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
    new RNDeviceInfoPackage(ctx),
    new NetInfoPackage(ctx),
    new AsyncStoragePackage(ctx),
  ];
}
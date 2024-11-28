import { RNPackage, RNPackageContext } from "@rnoh/react-native-openharmony";
import { GeneratedPackage } from "./GeneratedPackage";


// 创建自定义的RNPackage
export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new GeneratedPackage(ctx),
  ];
}
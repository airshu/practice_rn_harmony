import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';
import window from '@ohos.window';
import {  util } from '@kit.ArkTS';


export class RNGetRandomValuesTurboModule extends TurboModule implements TM.GetRandomValuesNativeModule.Spec {
  windowClass:window.Window| undefined = undefined;
  isKeepScreenOn: boolean = true;
  unisKeepScreenOn: boolean = false;

  constructor(ctx) {
    super(ctx);
  }


  getRandomBase64(byteLength:number){
    const randomBytes = new Uint8Array(byteLength)
    for(var i = 0 ; i<byteLength;i++){
      randomBytes[i] = Math.floor(Math.random()*256)
  }
    const that = new util.Base64Helper()
    const base64String = that.encodeToStringSync(randomBytes);
     //将随机字节数组转换为Base64编码的字符串
    return base64String
}



}




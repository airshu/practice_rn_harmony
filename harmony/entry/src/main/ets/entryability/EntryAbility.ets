import { RNAbility } from "@rnoh/react-native-openharmony";


export default class EntryAbility extends RNAbility {

  protected getPagePath(): string {
    return 'pages/Index';
  }

}
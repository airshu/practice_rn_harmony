import { ScrollView, Button, Text } from "react-native";

import RNDeviceInfo from '@react-native-oh-tpl/react-native-device-info';

export const DeviceInfoDemo = ({ navigation }) => {

  return (<ScrollView style={{ padding: 20 }}>
    <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />

      <Text>DeviceInfo Demo</Text>
            <Text>BundleId: {RNDeviceInfo.getBundleId()}</Text>
            <Text>getVersion: {RNDeviceInfo.getVersion()}</Text>
            <Text>getReadableVersion: {RNDeviceInfo.getReadableVersion()}</Text>
            <Text>getBuildNumber: {RNDeviceInfo.getBuildNumber()}</Text>
            <Text>getApplicationName: {RNDeviceInfo.getApplicationName()}</Text>
            <Text>getBrand: {RNDeviceInfo.getBrand()}</Text>
            <Text>getModel: {RNDeviceInfo.getModel()}</Text>
            <Text>getDeviceType: {RNDeviceInfo.getDeviceType()}</Text>

  </ScrollView>);
}
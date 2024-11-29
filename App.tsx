import React from 'react';
import { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  Button,
  ScrollView,
  View,
  Alert
} from 'react-native';
import { RNTCalculator } from 'rtn-calculator';
import RNDeviceInfo from '@react-native-oh-tpl/react-native-device-info';
// import SampleTurboModule from './src/bundles/basic/SampleTurboModule';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const App: () => Node = () => {
  const [result, setResult] = useState<string | null>(null);


  const [fetchInfo, setFetchInfo] = React.useState("");
  const [refreshInfo, setRefreshInfo] = React.useState("");
  const netInfo = useNetInfo();

  NetInfo.fetch().then((state) => {
    setFetchInfo(JSON.stringify(state));
  });
  NetInfo.refresh().then((state) => {
    setRefreshInfo(JSON.stringify(state));
  });

  return (
    <SafeAreaView>
      <ScrollView >
        <View>
          <StatusBar barStyle={'dark-content'} />
          <Text style={{ marginLeft: 20, marginTop: 20 }}>
            3+7={result ?? '??'}
          </Text>
          <Button
            title="Compute"
            onPress={async () => {
              try {
                const value = await RNTCalculator.add(3, 7);
                setResult("" + value);
              } catch (error) {
                console.error(error);
                setResult("" + error);
              }

            }}
          />
          <Button title='Test' onPress={() => {
            // SampleTurboModule.test();
          }} />
          <Text>DeviceInfo Demo</Text>
          <Text>BundleId: {RNDeviceInfo.getBundleId()}</Text>
          <Text>getVersion: {RNDeviceInfo.getVersion()}</Text>
          <Text>getReadableVersion: {RNDeviceInfo.getReadableVersion()}</Text>
          <Text>getBuildNumber: {RNDeviceInfo.getBuildNumber()}</Text>
          <Text>getApplicationName: {RNDeviceInfo.getApplicationName()}</Text>
          <Text>getBrand: {RNDeviceInfo.getBrand()}</Text>
          <Text>getModel: {RNDeviceInfo.getModel()}</Text>
          <Text>getDeviceType: {RNDeviceInfo.getDeviceType()}</Text>

          <View style={{ height: 20 }} />
          <Text>NetInfo Demo</Text>
          <Text>Type: {netInfo.type}</Text>
          <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>fetch():</Text>
          <Text>{fetchInfo}</Text>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>refresh():</Text>
          <Text>{refreshInfo}</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};
export default App;
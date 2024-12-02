import React from 'react';
import { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  Button,
  ScrollView,
  View,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import { RNTCalculator, SampleTurboModule } from 'rtn-calculator';
import RNDeviceInfo from '@react-native-oh-tpl/react-native-device-info';
// import SampleTurboModule from './src/bundles/basic/SampleTurboModule';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { useAsyncStorage } from "@react-native-oh-tpl/async-storage";

const App: () => Node = () => {


  // native侧发送的消息监听
  DeviceEventEmitter.addListener('onTest', (event) => {
    console.log('onTest', event);
  });

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
            SampleTurboModule.test();
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

          <View style={{ height: 20 }} />
          <AsyncStorageDemo />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};



function AsyncStorageDemo() {
  const [value, setValue] = useState("value");
  const { getItem, setItem } = useAsyncStorage("@storage_key");

  const readItemFromStorage = async () => {
    const item = await getItem();
    setValue(item);
  };

  const writeItemToStorage = async (newValue) => {
    console.log("writeItemToStorage start", newValue);
    await setItem(newValue);
    console.log("writeItemToStorage end", newValue);
    setValue(newValue);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <View style={{ margin: 40 }}>
      <Text>AsyncStorage Demo</Text>
      <Text>Current value: {value}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          margin: 20,
          borderRadius: 5,
        }}
        onPress={() =>
          writeItemToStorage(Math.random().toString(36).substr(2, 5))
        }
      >
        <Text>Update value</Text>
      </TouchableOpacity>
    </View>
  );
}



export default App;
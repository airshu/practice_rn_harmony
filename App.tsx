import React from 'react';
import { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from "react-native-safe-area-context";

import { Badge, WhiteSpace } from "@ant-design/react-native";

import Slider from "@react-native-community/slider";

import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

import { HooksUnTester } from "./src/HooksUnTester";

import { MaskedDemo } from "./src/MaskedDemo";

import { TestDemo } from "./src/TestDemo";


const HomeStack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Hooks"
        onPress={() => navigation.navigate('Hooks')}
      />
      <Button
        title="Go to MaskDemo"
        onPress={() => navigation.navigate('MaskedDemo')}
      />
      <Button
        title="Go to TestDemo"
        onPress={() => navigation.navigate('TestDemo')}
      />
      <Main />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
      <Badge text={9}>
        <View
          style={{
            width: 52,
            height: 52,
            backgroundColor: "rgba(255, 140, 101, 0.15)",
          }}
        />
      </Badge>
      <WhiteSpace size="lg" />
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: "violet",
        }}
      />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const App: () => Node = () => {
  return (<NavigationContainer>
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Hooks" component={HooksUnTester} />
      <HomeStack.Screen name="MaskedDemo" component={MaskedDemo} />
      <HomeStack.Screen name="TestDemo" component={TestDemo} />
    </HomeStack.Navigator>
  </NavigationContainer>);
}



const Main: () => Node = () => {


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
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
    </SafeAreaProvider>
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
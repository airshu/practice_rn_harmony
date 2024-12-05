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

// import SampleTurboModule from './src/bundles/basic/SampleTurboModule';


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackHeaderLeftButtonProps } from '@react-navigation/stack';

import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from "react-native-safe-area-context";

import { Badge, WhiteSpace } from "@ant-design/react-native";

import Slider from "@react-native-community/slider";

import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { HooksUnTester } from "./src/HooksUnTester";
import { MaskedDemo } from "./src/MaskedDemo";
import { TestDemo } from "./src/TestDemo";
import { FlashListDemo } from "./src/FlashListDemo";
import { VectorIconsDemo } from "./src/VectorIconsDemo";
import { DeviceInfoDemo } from "./src/DeviceInfoDemo";
import { NetInfoDemo } from "./src/NetInfoDemo";
import { AsyncStorageDemo } from "./src/AsyncStorageDemo";
import { CollapsibleDemo } from "./src/CollapsibleDemo";
import { GetRandomValuesDemo } from "./src/GetRandomValuesDemo";
import { WebViewDemo } from "./src/WebViewDemo";
import { FastImageDemo } from "./src/FastImageDemo";
import { SimpleDemo } from "./src/SimpleDemo";
import { FSDemo } from "./src/FSDemo";


const HomeStack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to SimpleDemo"
        onPress={() => navigation.navigate('SimpleDemo')}
      />
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
      <Button
        title="Go to FlashListDemo"
        onPress={() => navigation.navigate('FlashListDemo')}
      />
      <Button
        title="Go to VectorIconsDemo"
        onPress={() => navigation.navigate('VectorIconsDemo')}
      />
      <Button
        title="Go to DeviceInfoDemo"
        onPress={() => navigation.navigate('DeviceInfoDemo')}
      />
      <Button
        title="Go to NetInfoDemo"
        onPress={() => navigation.navigate('NetInfoDemo')}
      />
      <Button
        title="Go to AsyncStorageDemo"
        onPress={() => navigation.navigate('AsyncStorageDemo')}
      />
      <Button
        title="Go to CollapsibleDemo"
        onPress={() => navigation.navigate('CollapsibleDemo')}
      />
      <Button
        title="Go to GetRandomValuesDemo"
        onPress={() => navigation.navigate('GetRandomValuesDemo')}
      />
      <Button
        title="Go to WebViewDemo"
        onPress={() => navigation.navigate('WebViewDemo')}
      />
      <Button
        title="Go to FastImageDemo"
        onPress={() => navigation.navigate('FastImageDemo')}
      />
      <Button
        title="Go to FSDemo"
        onPress={() => navigation.navigate('FSDemo')}
      />
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
    <HomeStack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerTintColor: 'black',
        headerStyle: { backgroundColor: '#f8f8f8', shadowColor: "transparent",
          borderBottomColor: "rgba(49, 69, 106, 0.1)",
          borderBottomWidth: 1,},
        headerTitleStyle: {
          color: "#171F26"
        },
        headerTitleAlign: "center",
        headerLeft: (props: StackHeaderLeftButtonProps) => {
          if(!props.canGoBack) {
            return null;
          }
          return <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => {
            props.onPress();
          }}><Text >Back</Text></TouchableOpacity>; 
        },
      }}
      >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="SimpleDemo" component={SimpleDemo} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Hooks" component={HooksUnTester} />
      <HomeStack.Screen name="MaskedDemo" component={MaskedDemo} />
      <HomeStack.Screen name="TestDemo" component={TestDemo} />
      <HomeStack.Screen name="FlashListDemo" component={FlashListDemo} />
      <HomeStack.Screen name="VectorIconsDemo" component={VectorIconsDemo} />
      <HomeStack.Screen name="DeviceInfoDemo" component={DeviceInfoDemo} />
      <HomeStack.Screen name="NetInfoDemo" component={NetInfoDemo} />
      <HomeStack.Screen name="AsyncStorageDemo" component={AsyncStorageDemo} />
      <HomeStack.Screen name="CollapsibleDemo" component={CollapsibleDemo} />
      <HomeStack.Screen name="GetRandomValuesDemo" component={GetRandomValuesDemo} />
      <HomeStack.Screen name="WebViewDemo" component={WebViewDemo} />
      <HomeStack.Screen name="FastImageDemo" component={FastImageDemo} />
      <HomeStack.Screen name="FSDemo" component={FSDemo} />
    </HomeStack.Navigator>
  </NavigationContainer>);
}


export default App;
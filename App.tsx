import type { Node } from 'react';
import {
  Text,
  Button, View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';

// import SampleTurboModule from './src/bundles/basic/SampleTurboModule';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
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
import { SvgDemo } from "./src/SvgDemo";
import { AntDesignDemo } from "./src/AntDesignDemo";
import { VisionCameraDemo } from "./src/VisionCameraDemo";


const HomeStack = createStackNavigator();


function HomeScreen({ navigation }) {

  const useCustomButton = (title: string, onPress: () => void) => {
    return (<TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {useCustomButton('Go to SimpleDemo', () => navigation.navigate('SimpleDemo'))}
        {useCustomButton('Go to Hooks', () => navigation.navigate('Hooks'))}
        {useCustomButton('Go to MaskDemo', () => navigation.navigate('MaskedDemo'))}
        {useCustomButton('Go to TestDemo', () => navigation.navigate('TestDemo'))}
        {useCustomButton('Go to FlashListDemo', () => navigation.navigate('FlashListDemo'))}
        {useCustomButton('Go to VectorIconsDemo', () => navigation.navigate('VectorIconsDemo'))}
        {useCustomButton('Go to DeviceInfoDemo', () => navigation.navigate('DeviceInfoDemo'))}
        {useCustomButton('Go to NetInfoDemo', () => navigation.navigate('NetInfoDemo'))}
        {useCustomButton('Go to AsyncStorageDemo', () => navigation.navigate('AsyncStorageDemo'))}
        {useCustomButton('Go to CollapsibleDemo', () => navigation.navigate('CollapsibleDemo'))}
        {useCustomButton('Go to GetRandomValuesDemo', () => navigation.navigate('GetRandomValuesDemo'))}
        {useCustomButton('Go to WebViewDemo', () => navigation.navigate('WebViewDemo'))}
        {useCustomButton('Go to FastImageDemo', () => navigation.navigate('FastImageDemo'))}
        {useCustomButton('Go to FSDemo', () => navigation.navigate('FSDemo'))}
        {useCustomButton('Go to SvgDemo', () => navigation.navigate('SvgDemo'))}
        {useCustomButton("Go to AntDesignDemo", () => navigation.navigate('AntDesignDemo'))}
        {useCustomButton("Go to VisionCameraDemo", () => navigation.navigate('VisionCameraDemo'))}
      </ScrollView>
    </View>
  );
}

const App: () => Node = () => {
  return (<NavigationContainer>
    <HomeStack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerTintColor: 'black',
        headerStyle: {
          backgroundColor: '#f8f8f8', shadowColor: "transparent",
          borderBottomColor: "rgba(49, 69, 106, 0.1)",
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: "#171F26"
        },
        headerTitleAlign: "center",
        headerLeft: (props: HeaderBackButtonProps) => {
          if (!props.canGoBack) {
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
      <HomeStack.Screen name="SvgDemo" component={SvgDemo} />
      <HomeStack.Screen name="AntDesignDemo" component={AntDesignDemo} />
      <HomeStack.Screen name="VisionCameraDemo" component={VisionCameraDemo} />
    </HomeStack.Navigator>
  </NavigationContainer>);
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 3,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
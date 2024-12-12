import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  StatusBar,
  DeviceEventEmitter,
  RefreshControl
} from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from "react-native-safe-area-context";



export const SimpleDemo = ({ navigation }) => {
  // native侧发送的消息监听
  DeviceEventEmitter.addListener('onTest', (event) => {
    console.log('onTest', event);
  });

  const [result, setResult] = useState<string | null>(null);

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
          </View>
        </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

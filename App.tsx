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
// import SampleTurboModule from './src/bundles/basic/SampleTurboModule';

const App: () => Node = () => {
  const [result, setResult] = useState<string | null>(null);

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
                setResult(""+value);
              } catch (error) {
                console.error(error);
                setResult(""+error);
              }
              
            }}
          />
          <Button title='Test' onPress={()=>{
            // SampleTurboModule.test();
          }} />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};
export default App;
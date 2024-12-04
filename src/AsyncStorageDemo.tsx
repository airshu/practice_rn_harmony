import { useAsyncStorage } from "@react-native-oh-tpl/async-storage";
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
import { useState, useEffect } from 'react';


export function AsyncStorageDemo({ navigation }) {
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
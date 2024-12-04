import { ScrollView, Button, View, Text } from "react-native";
import React from 'react';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

export const NetInfoDemo = ({ navigation }) => {

  const [fetchInfo, setFetchInfo] = React.useState("");
  const [refreshInfo, setRefreshInfo] = React.useState("");
  const netInfo = useNetInfo();

  NetInfo.fetch().then((state) => {
    setFetchInfo(JSON.stringify(state));
  });
  NetInfo.refresh().then((state) => {
    setRefreshInfo(JSON.stringify(state));
  });


  return (<ScrollView style={{ padding: 20 }}>
    <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />

      <View style={{ height: 20 }} />
            <Text>NetInfo Demo</Text>
            <Text>Type: {netInfo.type}</Text>
            <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>fetch():</Text>
            <Text>{fetchInfo}</Text>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>refresh():</Text>
            <Text>{refreshInfo}</Text>

            <View style={{ height: 20 }} />

  </ScrollView>);
}
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  RefreshControl
} from 'react-native';


export const TestDemo = ({ navigation }) => {

  return (<View>
    <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    <Text>Hello Test</Text></View>);
}
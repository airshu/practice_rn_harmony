import { StyleSheet,SafeAreaView } from 'react-native';
import { Svg,Path } from 'react-native-svg';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Svg width="100" height="100">
        <Path d="M90 0 L0 180 L180 180 Z" fill="red" />
      </Svg>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'grey',
  },
});

export const SvgDemo = ({ navigation }) => {
  return (<App />);
}
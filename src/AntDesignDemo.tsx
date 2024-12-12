import { Badge, WhiteSpace } from "@ant-design/react-native";
import { Button, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Slider from "@react-native-community/slider";


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

export const AntDesignDemo = ({ navigation }) => {
  return (<DetailsScreen navigation={navigation} />);
}
import { StyleSheet, Text, View, Colors } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';


export const MaskedDemo = ({ navigation }) => {
  return (
    <MaskedView
      style={{ flex: 1, flexDirection: 'row', height: '100%' }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 60,
              color: 'black',
              fontWeight: 'bold'
            }}
          >
            Basic Mask
          </Text>
        </View>
      }
    >
      {/* Shows behind the mask, you can put anything here, such as an image */}
      <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
      <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
      <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
      <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  maskedView: {
    width: '100%',
    height: '40%'
  },
  maskElementView: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  maskElementText: {
    color: '#000000',
    width: '100%',
    height: 60,
    fontSize: 50,
    fontWeight: 'bold',
  },
  textView: {
    fontSize: 20,
    alignItems: 'center',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#986960',
    fontSize: 8,
    width: '100%',
    height: 40,
    fontVariant: ['small-caps'],
    fontWeight: 'bold',
  },
});

import { Button, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { Camera, useCameraDevice, useCameraFormat, useCameraPermission } from 'react-native-vision-camera';

function _App() {
    const device = useCameraDevice('back');
    const format = useCameraFormat(device, [
        { videoResolution: { width: 3048, height: 2160 } },
        { fps: 60 },
    ]);
    const { hasPermission, requestPermission } = useCameraPermission();
    const camera = useRef<Camera>(null);

    if (!device) {
        return <Text>No Devices</Text>;
    }

    if (!hasPermission) {
        requestPermission();
    }

    const onTakePhoto = async () => {
        const photoFile = await camera.current?.takePhoto();

        if (photoFile) {
          console.log("takePhoto photoFile:", photoFile);
          console.log("Photo File Type:", typeof photoFile);
          console.log("Photo File Content:", JSON.stringify(photoFile, null, 2));
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                ref={camera}
                device={device}
                format={format}
                isActive={true}
                preview={true}
                photo={true}
            />
            <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, zIndex: 999 }}>
                <Button title="拍照" onPress={onTakePhoto}></Button>
            </View>
        </View>
    );
}

export const VisionCameraDemo = ({ navigation }) => {
  return (<_App />);
}
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

export default function BackgroundImage() {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState('off');
  const [backgroundImage, setBackgroundImage] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('backgroundImage')
      .then((value) => {
        if (value) {
          setBackgroundImage(value);
        }
      });
  }, []);

  const sCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      setPreviewVisible(true);
      setCapturedImage(photo);
    }
  }

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  }

  const handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  }

  const switchCamera = () => {
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled && result.uri) {
      await AsyncStorage.setItem('backgroundImage', result.uri);
      setBackgroundImage(result.uri);
    }
  };
  
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={{ flex: 1, width: '100%' }}>
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} retakePicture={retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={cameraRef}
            >
              <View style={{ flex: 1, width: '100%', backgroundColor: 'transparent', flexDirection: 'row' }}>
                <View style={{ position: 'absolute', left: '5%', top: '10%', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    onPress={handleFlashMode}
                    style={{ backgroundColor: flashMode === 'off' ? '#000' : '#fff', borderRadius: 25, height: 25, width: 25 }}
                  >
                    <Text style={{ fontSize: 20 }}>⚡️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={switchCamera}
                    style={{ marginTop: 20, borderRadius: 25, height: 25, width: 25 }}
                  >
                    <Text style={{ fontSize: 20 }}>{cameraType === Camera.Constants.Type.front ? '🤳' : '📷'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', flex: 1, width: '100%', padding: 20, justifyContent: 'space-between' }}>
                  <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={takePicture}
                      style={{ width: 70, height: 70, bottom: 0, borderRadius: 50, backgroundColor: '#fff' }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={{ uri: backgroundImage }}
            style={{ flex: 1 }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Select background image</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CameraPreview = ({ photo, retakePicture }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: photo && photo.uri }} style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 15, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}
            >
              <Text style={{ color: '#fff', fontSize: 20 }}>Re-take</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

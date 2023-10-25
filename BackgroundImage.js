import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraRoll } from 'react-native';

export default function BackgroundImage() {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState('off');

  const cameraRef = useRef(null);

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

  const savePhoto = async () => {
    if (capturedImage) {
      const { uri } = capturedImage;
      try {
        await CameraRoll.saveToCameraRoll(uri, 'photo');
        Alert.alert('Photo saved to gallery');
      } catch (error) {
        console.error('Error saving photo:', error);
        Alert.alert('Failed to save photo. Please try again.');
      }
    }
  };

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

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={{ flex: 1, width: '100%' }}>
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={savePhoto} retakePicture={retakePicture} />
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
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={sCamera}
            style={{ width: 130, borderRadius: 4, backgroundColor: '#14274e', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40 }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Take picture</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  console.log('sdsfds', photo);
  return (
    <View style={{ backgroundColor: 'transparent', flex: 1, width: '100%', height: '100%' }}>
      <ImageBackground source={{ uri: photo && photo.uri }} style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'column', padding: 15, justifyContent: 'flex-end' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}
            >
              <Text style={{ color: '#fff', fontSize: 20 }}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{ width: 130, height: 40, alignItems: 'center', borderRadius: 4 }}
            >
              <Text style={{ color: '#fff', fontSize: 20 }}>Save photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';

const BackgroundImage = () => {
    const [imageUri, setImageUri] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);
  
    const handleTakePicture = async (camera) => {
      if (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        setImageUri(data.uri);
        setCameraOpen(false);
      }
    };
  
    const openCamera = () => {
      setCameraOpen(true);
    };
  
    return (
      <View style={styles.container}>
        {cameraOpen ? (
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
          >
            <TouchableOpacity style={styles.cameraButton} onPress={() => handleTakePicture()}>
              <Text style={styles.cameraButtonText}>Sacar Foto</Text>
            </TouchableOpacity>
          </RNCamera>
        ) : (
          <ImageBackground
          source={imageUri ? { uri: imageUri } : null}
          resizeMode="cover"
            style={styles.image}
          >
            <TouchableOpacity style={styles.changeBackgroundButton} onPress={openCamera}>
              <Text style={styles.changeBackgroundButtonText}>Cambiar Fondo</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Inside</Text>
          </ImageBackground>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraButton: {
    marginBottom: 20,
  },
  cameraButtonText: {
    fontSize: 20,
    color: 'white',
  },
  changeBackgroundButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  changeBackgroundButtonText: {
    color: 'white',
  },
});

export default BackgroundImage;

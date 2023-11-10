import React, { useState } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const BackgroundImage = () => {
  const [image, setImage] = useState('');

  const selectImage = async () => {
    const options = {
      title: 'Selecciona una imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const response = await ImagePicker.launchImageLibraryAsync(options);

    if (response.errorCode) {
      console.log(response.errorMessage);
    } else if (response.cancelled) {
      console.log('Usuario canceló');
    } else {
      const path = response.assets[0].uri;
      setImage(path);
      saveImageToLibrary(path);
    }
  };

  const takePicture = async () => {
    const options = {
      title: 'Tomar una imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };

    const response = await ImagePicker.launchCameraAsync(options);

    if (response.errorCode) {
      console.log(response.errorMessage);
    } else if (response.cancelled) {
      console.log('Usuario canceló');
    } else {
      const uri = response.assets[0].uri;
      setImage(uri);
      saveImageToLibrary(uri);
    }
  };

  const saveImageToLibrary = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('MyImages', asset, false);
      console.log('Imagen guardada en la galería.');
    } catch (error) {
      console.log('Error al guardar la imagen: ' + error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
        <Button title="Seleccionar img" onPress={selectImage} />
        <Button title="Tomar img" onPress={takePicture} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default BackgroundImage;

import React, { useState, useEffect } from 'react';
import { View, Button, ImageBackground, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackgroundImage = ({ onImageChange }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    requestPermission();
    loadSavedImage(); 
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const { statusCamera } = await ImagePicker.requestCameraPermissionsAsync();
      const { statusGallery } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (statusCamera !== 'granted' || statusGallery !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requieren permisos para acceder a la cámara y a la galería.');
      }
    }
  };

  const loadSavedImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('savedImage');
      if (savedImage) {
        setImage(savedImage);
      }
    } catch (error) {
      console.log('Error al cargar la imagen almacenada: ' + error);
    }
  };

  const saveImageToStorage = async (uri) => {
    try {
      await AsyncStorage.setItem('savedImage', uri);
    } catch (error) {
      console.log('Error al guardar la imagen en el almacenamiento: ' + error);
    }
  };

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
    } else {
      const uri = response.assets[0].uri;
      setImage(uri);
      saveImageToLibrary(uri);
    }
  };

  const saveImageToLibrary = async (uri) => {
    try {
      await saveImageToStorage(uri);
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('MyImages', asset, false);
      console.log('Imagen guardada en la galería.');
      onImageChange(uri);
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
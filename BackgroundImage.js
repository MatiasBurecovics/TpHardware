import React, { useState, useEffect } from 'react';
import { View, Button, ImageBackground, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackgroundImage = () => {
  const [image, setImage] = useState(null);

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

  const loadSavedImage = async (image) => {
    try {
      await AsyncStorage.setItem("image", image);
      console.log(image)
    } catch (error) {
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('image');
      if (value !== null) {
        setImage(value)
        console.log(value);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    retrieveData() 
  }, []);

  useEffect(()=>{
    loadSavedImage(image)
  },[image]);


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

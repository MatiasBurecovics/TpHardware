import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import BackgroundImage from './BackgroundImage';

export default function App() {
  const [showBackgroundImage, setShowBackgroundImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const saveSelectedImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem('selectedImage', imageUri);
    } catch (error) {
      console.error('Error saving selected image: ', error);
    }
  }

  const getSelectedImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('selectedImage');
      return imageUri;
    } catch (error) {
      console.error('Error retrieving selected image: ', error);
    }
  }

  const handleSelectBackgroundImage = async () => {
    const imageUri = await getSelectedImage();
    setSelectedImage(imageUri);
  };

  useEffect(() => {
    handleSelectBackgroundImage();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {selectedImage ? (
        <ImageBackground source={{ uri: selectedImage }} style={{ flex: 1 }}>
          <BackgroundImage />
        </ImageBackground>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Press the button to select a background image</Text>
          <Button title="Select Background Image" onPress={handleSelectBackgroundImage} />
        </View>
      )}
    </View>
  );
}

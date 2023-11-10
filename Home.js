import React from 'react';
import { StyleSheet, View, Button, ImageBackground } from 'react-native';

function Home({ navigation, backgroundImage }) {
  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImageContainer}
    >
      <View style={styles.container}>
        <Button
          title="WeatherComponent"
          onPress={() => {
            navigation.navigate('WeatherComponent');
          }}
        />
        <Button
          title="NroEmergencia"
          onPress={() => {
            navigation.navigate('NroEmergencia');
          }}
        />
        <Button
          title="AboutScan"
          onPress={() => {
            navigation.navigate('AboutScan');
          }}
        />
        <Button
          title="BackgroundImage"
          onPress={() => {
            navigation.navigate('BackgroundImage');
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImageContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;

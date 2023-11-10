import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const AboutScan = ({ backgroundImage }) => {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(data);
    setIsScanning(false);
  };

  const startScanning = () => {
    setScanned(false);
    setIsScanning(true);
  };

  if (permission === null) {
    return <Text style={styles.loadingText}>Esperando respuesta...</Text>;
  }
  if (permission === false) {
    return <Text style={styles.errorText}>Acceso denegado</Text>;
  }

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImageContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sobre nosotros</Text>
        <Image source={require('./assets/qr.png')} style={styles.qrcode} />
        <TouchableOpacity
          onPress={startScanning}
          style={[styles.scanButton, isScanning ? { backgroundColor: '#E7A64F' } : null]}
        >
          <Text style={styles.qrdis}>Escanear QR</Text>
        </TouchableOpacity>
        {isScanning && (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  qrcode: {
    width: 150,
    height: 150,
  },
  scanButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  qrdis:
  {
    color: 'black', 
    fontSize: 20 
  }
});

export default AboutScan;

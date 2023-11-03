import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const AboutScan = () => {
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
    <View style={styles.container}>
      <Text style={styles.title}>Sobre nosotros</Text>
      <Image source={require('./assets/qr.png')} style={styles.qrcode} />
      <TouchableOpacity
        onPress={startScanning}
        style={[styles.scanButton, isScanning ? { backgroundColor: '#E7A64F' } : null]}
      >
        <Text style={{ color: 'blue', fontSize: 20 }}>Escanear QR</Text>
      </TouchableOpacity>
      {isScanning && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3679A2', 
  },
  title: {
    fontSize: 24,
    color: 'white',
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
});

export default AboutScan;

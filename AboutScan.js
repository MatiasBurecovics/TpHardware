import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const AboutScan=({ navigation })=>  {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
  };

  if (permission === null) {
    return <Text>Esperando respuesta...</Text>;
  }
  if (permission === false) {
    return <Text>Acceso denegado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre nosotros</Text>
      <Image source={require('./assets/qr.png')} style={styles.qrcode} />
      <Button
        title={'Escanear QR'}
        style={{ fontSize: 20, marginTop: 20 }}
        onPress={() => navigation.navigate('Identifier')}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Volver a escanear'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  qrcode: {
    width: 150,
    height: 150,
  },
});

export default AboutScan;

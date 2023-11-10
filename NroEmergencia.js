import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ImageBackground } from 'react-native';
import { storeData, getData } from './localStorage';

const NroEmergencia = ({ backgroundImage }) => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadEmergencyNumber() {
      const storedNumber = await getData('emergencyNumber');
      if (storedNumber) {
        setNumber(storedNumber);
      }
    }
    loadEmergencyNumber();
  }, []);

  const saveNumber = async () => {
    storeData('emergencyNumber', number);
  };

  return (
    <View style={styles.container}>
      {backgroundImage ? (
        <ImageBackground source={{ uri: backgroundImage }} style={styles.backgroundImage}>
          <Text style={styles.title}>Configuración de número de emergencia</Text>
          <Text style={styles.text}>Tu número de emergencia es:</Text>
          <Text style={styles.emergencyNumber}>+54911{number}</Text>
          <TextInput
            onChangeText={(text) => setNumber(text)}
            value={number}
            keyboardType="numeric"
            placeholder="Número de emergencia"
            style={styles.input}
          />
          {error && (
            <Text style={styles.errorText}>
              La cantidad de dígitos debe ser 8
            </Text>
          )}
          <Button
            title="CONFIRMAR"
            color="#E7A64F"
            onPress={() => {
              if (number.length !== 8) {
                setError(true);
              } else {
                setError(false);
                saveNumber();
              }
            }}
          />
        </ImageBackground>
      ) : (
        <View style={styles.blueBackground}>
          <Text style={styles.title}>Configuración de número de emergencia</Text>
          <Text style={styles.text}>Tu número de emergencia es:</Text>
          <Text style={styles.emergencyNumber}>+54911{number}</Text>
          <TextInput
            onChangeText={(text) => setNumber(text)}
            value={number}
            keyboardType="numeric"
            placeholder="Número de emergencia"
            style={styles.input}
          />
          {error && (
            <Text style={styles.errorText}>
              La cantidad de dígitos debe ser 8
            </Text>
          )}
          <Button
            title="CONFIRMAR"
            color="#E7A64F"
            onPress={() => {
              if (number.length !== 8) {
                setError(true);
              } else {
                setError(false);
                saveNumber();
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  emergencyNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E7A64F',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default NroEmergencia;

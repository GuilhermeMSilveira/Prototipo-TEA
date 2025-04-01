import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';

const CameraPermissionScreen = ({ onPermissionGranted }) => {
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const { status } = await Camera.getPermissionsAsync();
        setCameraPermission(status === 'granted');
      } catch (error) {
        console.error('Erro ao verificar permissão da câmera:', error);
      }
    };
    checkPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === 'granted');

      if (status === 'granted') {
        onPermissionGranted();
      } else {
        Alert.alert(
          'Permissão Negada',
          'O aplicativo precisa de acesso à câmera para funcionar corretamente.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão da câmera:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao solicitar a permissão. Tente novamente.',
        [{ text: 'OK' }]
      );
    }
  };

  if (cameraPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Verificando permissão...</Text>
      </View>
    );
  }

  if (!cameraPermission) {
    return (
      <View style={styles.container}>
        <Text>Permissão para usar a câmera é necessária.</Text>
        <Button title="Permitir Câmera" onPress={requestPermission} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraPermissionScreen;

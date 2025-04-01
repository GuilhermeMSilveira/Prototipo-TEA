import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Linking } from 'react-native';
import { Camera } from 'expo-camera';

const IAEmotionScreen = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<any>(null);

  // Função para verificar se a permissão da câmera já foi concedida
  const checkCameraPermission = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    if (status === 'granted') {
      setCameraPermission(true);
    } else {
      setCameraPermission(false);
      showSettingsAlert();  // Se não foi concedido, mostra o alerta
    }
  };

  // Função para solicitar permissão caso o usuário ainda não tenha concedido
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setCameraPermission(true);
    } else {
      setCameraPermission(false);
      showSettingsAlert(); // Se negado, mostra o alerta
    }
  };

  // Função para mostrar o alerta de configurações
  const showSettingsAlert = () => {
    Alert.alert(
      'Permissão Negada',
      'Para ativar a câmera, vá até as configurações do seu dispositivo e conceda a permissão.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Abrir Configurações',
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  };

  // Função para tirar foto e analisar a emoção
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      // Aqui você pode adicionar sua função de análise da imagem
      console.log('Foto tirada:', photo.uri);
    }
  };

  // Função que será chamada ao montar o componente para verificar permissão
  useEffect(() => {
    checkCameraPermission(); // Verifica o status da permissão ao iniciar
  }, []);

  return (
    <View style={styles.container}>
      <Text>Reconhecimento de Emoções</Text>
      {cameraPermission === null ? (
        <Text>Verificando permissão...</Text>
      ) : cameraPermission ? (
        <View>
          <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
            <Button title="Tirar Foto" onPress={takePicture} />
          </Camera>
        </View>
      ) : (
        <Button title="Permitir Câmera" onPress={requestCameraPermission} />
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
  camera: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
});

export default IAEmotionScreen;

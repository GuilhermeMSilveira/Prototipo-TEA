import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

const IAEmotionScreen = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [emotion, setEmotion] = useState<string>('');

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
  };

  const analyzeEmotion = async (uri: string) => {
    const { faces } = await FaceDetector.detectFacesAsync(uri);
    if (faces.length > 0) {
      const firstFace = faces[0];
      if (firstFace.smilingProbability !== undefined) {
        setEmotion(firstFace.smilingProbability > 0.5 ? 'Feliz' : 'Neutro');
      } else {
        setEmotion('Neutro');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Reconhecimento de Emoções</Text>
      {cameraPermission ? (
        <Button title="Analisar Emoção" onPress={() => analyzeEmotion('imageUri')} />
      ) : (
        <Button title="Permitir Câmera" onPress={requestCameraPermission} />
      )}
      <Text>Emoção detectada: {emotion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IAEmotionScreen;

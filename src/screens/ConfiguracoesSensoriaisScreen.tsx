import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfiguracoesSensoriaisScreen: React.FC = () => {
  const [brightness, setBrightness] = useState(0.5);
  const [contrast, setContrast] = useState(0.5);

  // Carregar configurações salvas ao abrir a tela
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedBrightness = await AsyncStorage.getItem('brightness');
        const savedContrast = await AsyncStorage.getItem('contrast');

        if (savedBrightness !== null) setBrightness(parseFloat(savedBrightness));
        if (savedContrast !== null) setContrast(parseFloat(savedContrast));
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    };

    loadSettings();
  }, []);

  // Salvar configurações manualmente
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('brightness', brightness.toString());
      await AsyncStorage.setItem('contrast', contrast.toString());
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      Alert.alert('Erro', 'Não foi possível salvar as configurações.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Ajuste de Brilho</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={brightness}
        onValueChange={setBrightness}
      />
      <Text>Brilho: {brightness.toFixed(2)}</Text>

      <Text>Ajuste de Contraste</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={contrast}
        onValueChange={setContrast}
      />
      <Text>Contraste: {contrast.toFixed(2)}</Text>

      <Button title="Salvar Configurações" onPress={saveSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  slider: {
    width: '100%',
    marginVertical: 10,
  },
});

export default ConfiguracoesSensoriaisScreen;

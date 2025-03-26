import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfiguracoesSensoriaisScreen = () => {
  const [brightness, setBrightness] = useState(0.5);
  const [contrast, setContrast] = useState(0.5);

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

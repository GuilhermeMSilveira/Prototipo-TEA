// src/screens/RelatoriosScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RelatoriosScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Relatórios de Progresso da Criança</Text>
      {/* Adicionar gráficos ou listas de desempenho */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default RelatoriosScreen;

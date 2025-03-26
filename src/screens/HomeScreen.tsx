import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { analisarDesempenho } from '../uteis/aiAnalysis';

const HomeScreen = () => {
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const historicoRespostas = [1, 0, 1, 1, 0, 1];

    analisarDesempenho(historicoRespostas)
      .then(resposta => {
        setResultado(resposta);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro na análise de desempenho:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado da Análise de Desempenho:</Text>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text style={styles.result}>{resultado}</Text>}
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  result: {
    fontSize: 16,
    color: 'green',
  },
});

export default HomeScreen;

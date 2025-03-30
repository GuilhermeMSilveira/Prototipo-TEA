import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      setErrorMessage('Erro ao fazer login: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
      />
      <Text>Senha:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center', // Centraliza o conteúdo
  },
  logo: {
    width: 200,  // Ajuste o tamanho do logo conforme necessário
    height: 100, // Ajuste o tamanho do logo conforme necessário
    marginBottom: 40, // Espaçamento abaixo do logo
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%', // Largura total para os campos de entrada
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;

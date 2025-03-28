import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login'); // Retorna para a tela de login após sair
  };

  return (
    <View style={styles.container}>
      <Text>Bem-vindo à HomeScreen!</Text>
      <Button title="Sair" onPress={handleLogout} />
      <Button
        title="Ajustes Sensoriais"
        onPress={() => navigation.navigate('ConfiguracoesSensoriais')}
      />
      <Button
        title="Reconhecimento de Emoções"
        onPress={() => navigation.navigate('IAEmotion')}
      />
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

export default HomeScreen;

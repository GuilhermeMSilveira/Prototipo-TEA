import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const videos = [
  {
    id: "1",
    title: "Aprendendo Cores",
    url: "https://www.youtube.com/embed/swvFa09iHMQ", // URL do vídeo do YouTube para embed
  },
  { id: "2", title: "Números Divertidos", url: "https://www.youtube.com/embed/anotherVideoID" },
  { id: "3", title: "História Interativa", url: "https://www.youtube.com/embed/anotherVideoID" },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login'); // Retorna para a tela de login após sair
  };

  const handleProfilePress = () => {
    setIsMenuVisible(!isMenuVisible); // Alterna a visibilidade do menu
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/Logo.png')} style={styles.logo} resizeMode="contain" />

      {/* Ícone de perfil no canto superior direito */}
      <TouchableOpacity onPress={handleProfilePress} style={styles.profileIconContainer}>
        <Text style={styles.profileIcon}>👤</Text>
      </TouchableOpacity>

      {/* Menu de configurações */}
      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ConfiguracoesSensoriais')}
          >
            <Text style={styles.menuText}>Ajustes Sensoriais</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Título */}
      <Text style={styles.title}>Vídeos Educacionais</Text>

      {/* Se nenhum vídeo foi selecionado, exibe a lista */}
      {!selectedVideo ? (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.videoItem}
              onPress={() => setSelectedVideo(item.url)}
            >
              <Text style={styles.videoTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        // Se um vídeo foi selecionado, exibe o WebView
        <WebView
          source={{ uri: selectedVideo }}
          style={styles.video}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 180,  // Ajuste o tamanho do logo conforme necessário
    height: 80, // Ajuste o tamanho do logo conforme necessário
    marginBottom: 30, // Espaçamento abaixo do logo
    alignSelf: 'center', // Alinhar no centro da tela
    borderRadius: 15, // Bordas arredondadas para um visual mais moderno
    shadowColor: '#000', // Sombra da imagem
    shadowOffset: { width: 0, height: 4 }, // Offset da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 5, // Raio da sombra
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileIconContainer: {
    position: 'absolute',
    top: 20,  // Ajuste o valor para a altura que você deseja
    right: 10, // Ajuste o valor para a distância da direita que você deseja
    width: 50,  // Ajuste o tamanho da bola
    height: 50,  // Ajuste o tamanho da bola
    borderRadius: 25, // Metade da largura/altura para tornar a View circular
    backgroundColor: '#d3d3d3', // Cor da bola, ajuste conforme necessário
    justifyContent: 'center', // Alinha o conteúdo (ícone) no centro
    alignItems: 'center', // Alinha o conteúdo (ícone) no centro
  },
  profileIcon: {
    fontSize: 30,  // Ajuste o tamanho do ícone conforme necessário
    color: '#fff', // Cor do ícone (branca, para contraste com a bola)
  },
  menu: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  videoItem: {
    padding: 15,
    backgroundColor: "#ddd",
    marginVertical: 5,
    borderRadius: 10,
  },
  videoTitle: {
    fontSize: 18,
  },
  video: {
    width: "100%",
    height: 300,
  },
});

export default HomeScreen;

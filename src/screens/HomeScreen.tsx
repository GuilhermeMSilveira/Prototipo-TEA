import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { Camera } from 'expo-camera';
import { Linking } from 'react-native';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const videos = [
  { id: "1", title: "Aprendendo Cores", url: "https://www.youtube.com/embed/swvFa09iHMQ" },
  { id: "2", title: "Números Divertidos", url: "https://www.youtube.com/embed/anotherVideoID" },
  { id: "3", title: "História Interativa", url: "https://www.youtube.com/embed/anotherVideoID" },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [hasCheckedCameraPermission, setHasCheckedCameraPermission] = useState(false); // Novo estado

  useEffect(() => {
    const checkCameraPermission = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();

      if (status !== 'granted' && !hasCheckedCameraPermission) { // Verifique se já verificou antes
        Alert.alert(
          'Permissão Necessária',
          'Este aplicativo precisa de acesso à câmera para análise de emoções. Deseja permitir?',
          [
            {
              text: 'Não',
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                if (status !== 'granted') {
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
                }
              },
            },
          ]
        );
      }
      setHasCheckedCameraPermission(true); // Marcar como verificado
    };

    checkCameraPermission();
  }, [hasCheckedCameraPermission]); // Verifique quando for necessário

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  const handleProfilePress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity onPress={handleProfilePress} style={styles.profileIconContainer}>
        <Text style={styles.profileIcon}>👤</Text>
      </TouchableOpacity>

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

      <Text style={styles.title}>Vídeos Educacionais</Text>

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
    width: 180,
    height: 80,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileIconContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 30,
    color: '#fff',
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

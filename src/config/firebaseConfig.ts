import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA7W3xmnKjnnBJ7LBFiiHEM-jItJZIPDWk',
  authDomain: 'testeuser@gmail.com',
  projectId: 'guilhermem-29d59',
  storageBucket: 'Teste.projetoTCC',
  messagingSenderId: '1033451552965',
  appId: '1:1033451552965:android:db6ae67c3953668507b0ac',
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Obtém a instância de autenticação
const auth = getAuth(app);

export { auth };
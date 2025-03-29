import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Obtém a instância de autenticação
const auth = getAuth(app);

export { auth };

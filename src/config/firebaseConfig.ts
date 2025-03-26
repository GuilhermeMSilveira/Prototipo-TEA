// src/config/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyA7W3xmnKjnnBJ7LBFiiHEM-jItJZIPDWk',
  authDomain: 'teste.com',
  projectId: 'guilhermem-29d59',
  storageBucket: 'teste.com',
  messagingSenderId: '1033451552965',
  appId: '1:1033451552965:android:7865c287f0e66d3507b0ac',
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

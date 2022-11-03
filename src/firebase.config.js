import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC369BtlXQ7Vdz-sJFdm755MXlAzSKtT0A',
  authDomain: 'real-state-app-a84db.firebaseapp.com',
  projectId: 'real-state-app-a84db',
  storageBucket: 'real-state-app-a84db.appspot.com',
  messagingSenderId: '806864486368',
  appId: '1:806864486368:web:fe16dbf86c7f1deb137585',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Firebase web configuration is public metadata. Keep it together here so a
  // stale hosting-provider environment cannot silently point Auth at another project.
  apiKey: 'AIzaSyCzDMQ5NoRUXtUc4EpHXTN9r96IMh9dK-M',
  authDomain: 'i-journey-7d945.firebaseapp.com',
  projectId: 'i-journey-7d945',
  storageBucket: 'i-journey-7d945.firebasestorage.app',
  messagingSenderId: '1028710854249',
  appId: '1:1028710854249:web:e3bd187fbcffb06fe9fcf8',
  measurementId: 'G-5EK2FHV1BY',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

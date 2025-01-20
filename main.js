// main.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
};

initializeApp(firebaseConfig);

console.log('Firebase initialized');
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDVHOvDw9481KSkq2f4nOjgAheZmCZXJSM',
  authDomain: 'brewy-1.firebaseapp.com',
  databaseURL: 'https://brewy-1.firebaseio.com',
  projectId: 'brewy-1',
  storageBucket: 'brewy-1.appspot.com',
  messagingSenderId: '699948626567',
  appId: '1:699948626567:web:aacce383e0e34e21f97e22',
  measurementId: 'G-NXD7T8BKGX',
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

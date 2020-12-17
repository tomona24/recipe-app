import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBeX4wFHBXRDkLoYvrs3ZSGhxb9B5FulR4',
  authDomain: 'recipe-app-1435a.firebaseapp.com',
  databaseURL: 'https://recipe-app-1435a.firebaseio.com',
  projectId: 'recipe-app-1435a',
  storageBucket: 'recipe-app-1435a.appspot.com',
  messagingSenderId: '794125759921',
  appId: '1:794125759921:web:e9750bd3d6336988493990',
};

firebase.initializeApp(config);
firebase.storage();
const fbConfig = firebase.firestore();

export default fbConfig;

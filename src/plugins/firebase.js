import firebase from 'firebase';

const config - {
  apiKey: "AIzaSyBeX4wFHBXRDkLoYvrs3ZSGhxb9B5FulR4",
  authDomain: "recipe-app-1435a.firebaseapp.com",
  databaseURL: "https://recipe-app-1435a.firebaseio.com",
  projectId: "recipe-app-1435a",
  storageBucket: "recipe-app-1435a.appspot.com",
  messagingSenderId: "794125759921",
  appId: "1:794125759921:web:e9750bd3d6336988493990"
};

const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();
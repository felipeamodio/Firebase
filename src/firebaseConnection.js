//conexão com o firebase
import firebase from 'firebase/app';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyCTUbcfaOj4fOvc2ycP4tyljN-T1JF8OMY",
    authDomain: "meuapp-bc4a5.firebaseapp.com",
    databaseURL: "https://meuapp-bc4a5-default-rtdb.firebaseio.com",
    projectId: "meuapp-bc4a5",
    storageBucket: "meuapp-bc4a5.appspot.com",
    messagingSenderId: "633815856860",
    appId: "1:633815856860:web:d41e9e80dab35d09336619",
    measurementId: "G-7KYFHD9Q0J"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
    //abrir minha conexão
    firebase.initializeApp(firebaseConfig);
  }
//const app = initializeApp(firebaseConfig);

export default firebase;
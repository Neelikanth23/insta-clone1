import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAvZiGnZHuuITGQnjlP_SMvgQg9Ks4ulkU",
  authDomain: "insta-clone-a6e00.firebaseapp.com",
  databaseURL: "https://insta-clone-a6e00.firebaseio.com",
  projectId: "insta-clone-a6e00",
  storageBucket: "insta-clone-a6e00.appspot.com",
  messagingSenderId: "757798388437",
  appId: "1:757798388437:web:3d75bb86d9365b087bd85c",
  measurementId: "G-R3R0QFM4CM",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

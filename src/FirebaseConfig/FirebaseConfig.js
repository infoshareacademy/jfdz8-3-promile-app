import firebase from '../FirebaseConfig/FirebaseConfig'

const config = {
  apiKey: "AIzaSyCodMZvm6h_ssMv-_LoijUxLi1mG5TBkn0",
  authDomain: "promile-46c83.firebaseapp.com",
  databaseURL: "https://promile-46c83.firebaseio.com",
  projectId: "promile-46c83",
  storageBucket: "promile-46c83.appspot.com",
  messagingSenderId: "1026760981491"
};

const db = firebase.initializeApp(config);
export const database = db.database();
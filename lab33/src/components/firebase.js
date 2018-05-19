import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBT8KuTbrCo_Snp9upSXTshYMmXT3tLFFU",
  authDomain: "webshoplab33.firebaseapp.com",
  databaseURL: "https://webshoplab33.firebaseio.com",
  projectId: "webshoplab33",
  storageBucket: "",
  messagingSenderId: "424842396794"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;

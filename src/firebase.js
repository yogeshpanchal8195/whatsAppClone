import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAJuE_j0_1VkgzBwQUs2hn_farl3GDCJic",
  authDomain: "whatsappclone-2faf9.firebaseapp.com",
  databaseURL: "https://whatsappclone-2faf9.firebaseio.com",
  projectId: "whatsappclone-2faf9",
  storageBucket: "whatsappclone-2faf9.appspot.com",
  messagingSenderId: "758204789851",
  appId: "1:758204789851:web:1fe31beae7ef0c7e7a7b7e",
  measurementId: "G-3LXWGJVQ9P"
};

const firebaseApp =firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ experimentalForceLongPolling: true });
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;

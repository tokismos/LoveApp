import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBRcR98vPKAOTGFwt5Rb9IXFa7kXyPH_SY",
  authDomain: "loveapp-69783.firebaseapp.com",
  projectId: "loveapp-69783",
  storageBucket: "loveapp-69783.appspot.com",
  messagingSenderId: "555998588293",
  appId: "1:555998588293:web:2f1fff879b6957a4c8e8ec",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();

//Sign up
const signUp = async (email, password) => {
  await auth.createUserWithEmailAndPassword(email, password);
  db.ref(`users/${auth.currentUser.uid}`).set({
    Moods: "",
  });
};
const signIn = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("signed");
  } catch (e) {
    console.log(e);
  }
};

export { auth, signUp, signIn };

import * as firebase from "firebase";
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDEWsZaPxolrZgOdLceajF2A8xAgPteSGk",
  authDomain: "moody-6079f.firebaseapp.com",
  databaseURL: "https://moody-6079f-default-rtdb.firebaseio.com",
  projectId: "moody-6079f",
  storageBucket: "moody-6079f.appspot.com",
  messagingSenderId: "917758956918",
  appId: "1:917758956918:web:d309a9ddbdee9fb51a5657",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

const setStatus = async (status, callback) => {
  await db.ref(`users/${auth.currentUser.uid}/IsAvailable`).set(status);
  callback();
};
//Sign up
const signUp = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    db.ref(`users/${auth.currentUser.uid}`).set({
      CurrentMood: "",
      LoverId: "",
      ImgProfile: "",
      CurrentActivity: "",
      LoverId: "",
      IsAvailable: "",
      History: "",
      Request: "",
      Response: "",
    });
  } catch (e) {
    alert(e);
  }
};
const signIn = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("signed");
  } catch (e) {
    console.log(e);
  }
};

const getData = async (loadMood) => {
  await db
    .ref(`users/${auth.currentUser.uid}/CurrentMood`)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      loadMood(data);
    });
};

const getImgFile = async (uri) => {
  // Create a root reference
  const response = await fetch(uri);
  const blob = await response.blob();
  // Create a reference to 'mountains.jpg'
  const imgRef = storage.ref().child(`images/${auth.currentUser.uid}`);

  const tmp = imgRef.put(blob);
  tmp.on("state_changed", (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
  });

  imgRef
    .getDownloadURL()
    .then(async (url) => {
      await db.ref(`users/${auth.currentUser.uid}/ImgProfile`).set(url);
      console.log("added");
    })
    .catch((e) => console.log(e));
};

const getTime = () => {
  return firebase.database.ServerValue.TIMESTAMP;
};

const setRequest = async (req, loverId, callback) => {
  await db.ref(`users/${loverId}/Request`).set(req);
  callback();
};
const resetRequest = async () => {
  await db.ref(`users/${auth.currentUser.uid}/Request`).set("");
};
const resetResponse = async () => {
  await db.ref(`users/${auth.currentUser.uid}/Response`).set("");
};

const setResponse = async (response, loverId, callback) => {
  await db.ref(`users/${loverId}/Response`).set(response);
  callback();
};

export {
  auth,
  firebase,
  db,
  resetRequest,
  resetResponse,
  setResponse,
  setStatus,
  storage,
  signUp,
  signIn,
  getData,
  setRequest,
  getTime,
  getImgFile,
};

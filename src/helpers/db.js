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
const storage = firebase.storage();

const setStatus = async (status) => {
  await db.ref(`users/${auth.currentUser.uid}/IsAvailable`).set(status);
};
//Sign up
const signUp = async (email, password) => {
  await auth.createUserWithEmailAndPassword(email, password);
  db.ref(`users/${auth.currentUser.uid}`).set({
    CurrentMood: "",
    LoverId: "",
    ImgProfile: "",
    CurrentActivity: "",
    LoverId: "",
    IsAvailable: "",
    History: "",
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

const setRequest = async (req, loverId) => {
  await db.ref(`users/${loverId}/Requests`).set(req);
};
const resetRequest = async () => {
  await db.ref(`users/${auth.currentUser.uid}/Requests`).set("");
};

const setResponse = async (response, loverId) => {
  await db.ref(`users/${loverId}/Responses`).set(response);
};

export {
  auth,
  firebase,
  db,
  resetRequest,
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

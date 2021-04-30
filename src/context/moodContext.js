import createDataContext from "./createDataContext";
import { db, auth, getDatafromDb, firebase, getTime } from "../helpers/db";
const MoodReducer = (state, action) => {
  switch (action.type) {
    case "ADD_HISTORY":
      return {
        ...state,
        HistoryLover: action.payload,
      };
    case "GET_REQUEST":
      return { ...state, Request: action.payload };
    case "GET_RESPONSE":
      return { ...state, Response: action.payload };
    case "SET_MOOD":
      return { ...state, CurrentMood: action.payload };
    case "SELECT_MOOD":
      return { ...state, CurrentMood: action.payload };
    case "SYNC":
      return {
        ...state,
        CurrentMood: action.payload.CurrentMood,
        ImgProfile: action.payload.ImgProfile,
        LoverId: action.payload.LoverId,
        IsAvailable: action.payload.IsAvailable,
        CurrentActivity: action.payload.CurrentActivity,
      };
    case "SYNCLOVER":
      return {
        ...state,
        CurrentMoodLover: action.payload.CurrentMoodLover,
        ImgProfileLover: action.payload.ImgProfileLover,
        IsAvailableLover: action.payload.IsAvailableLover,
        CurrentActivityLover: action.payload.CurrentActivityLover,
        HistoryLover: action.payload.HistoryLover,
      };
    case "SELECT_ACTIVITY":
      return { ...state, CurrentActivity: action.payload };
    default:
      return;
  }
};

const loadMood = (dispatch) => (mood) => {
  dispatch({ type: "SET_MOOD", payload: CurrentMood });
};

// Begin----> fetch data from db and save it in context for the current user
const syncDbWithContext = (dispatch) => async () => {
  await db.ref(`users/${auth.currentUser.uid}`).on("value", (snapshot) => {
    const data = snapshot.val();
    dispatch({
      type: "SYNC",
      payload: {
        CurrentMood: data.CurrentMood,
        ImgProfile: data.ImgProfile,
        LoverId: data.LoverId,
        IsAvailable: data.IsAvailable,
        CurrentActivity: data.CurrentActivity,
      },
    });
  });
};
//<---- END

const getRequestsFromDb = (dispatch) => async () => {
  await db
    .ref(`users/${auth.currentUser.uid}/Requests`)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("DAATA", data);
      dispatch({
        type: "GET_REQUEST",
        payload: data,
      });
    });
};
const getResponseFromDb = (dispatch) => async () => {
  await db
    .ref(`users/${auth.currentUser.uid}/Responses`)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("DAATA", data);
      dispatch({
        type: "GET_RESPONSE",
        payload: data,
      });
    });
};

// Begin---->Fetch data of the loverId from the db and add it to the lover context
const getLoverDataFromDb = (dispatch) => (loverId) => {
  return new Promise(async (resolve, reject) => {
    await db.ref(`users/${loverId}`).on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      dispatch({
        type: "SYNCLOVER",
        payload: {
          CurrentMoodLover: data.CurrentMood,
          ImgProfileLover: data.ImgProfile,
          IsAvailableLover: data.IsAvailable,
          CurrentActivityLover: data.CurrentActivity,
          HistoryLover: data.History,
        },
      });
      resolve();
    });
  });
};
// <---- End

const selectActivity = (dispatch) => async (activity) => {
  try {
    await db.ref(`users/${auth.currentUser.uid}/CurrentActivity`).set(activity);
    await db.ref(`users/${auth.currentUser.uid}/History`).push(activity);
    dispatch({ type: "ADD_HISTORY", payload: history });
    // const date = new Date();
    // const time = date.getHours() + " " + date.getMinutes();
    // console.log("this is time in js", time);
    // console.log(
    //   "this is time in firebase",
    //   firebase.database.ServerValue.TIMESTAMP
    // );
    dispatch({ type: "SELECT_ACTIVITY", payload: activity });
  } catch (err) {
    console.log(err);
  }
};

const selectMood = (dispatch) => async (mood) => {
  try {
    await db.ref(`users/${auth.currentUser.uid}/CurrentMood`).set(mood);
    await db.ref(`users/${auth.currentUser.uid}/History`).push(mood);
    dispatch({ type: "SELECT_MOOD", payload: CurrentMood });
    console.log("mood selected");
    //  if (isAuto) await AsyncStorage.setItem("uid", result.user.uid);
  } catch (err) {
    //    dispatch({ type: "ADD_ERROR", payload: err });
  }
  //dispatch({ type: "IS_LOADING", payload: false });
};
const addToHistory = (dispatch) => async (history) => {
  try {
    await db.ref(`users/${auth.currentUser.uid}/History`).push(history);
    dispatch({ type: "ADD_HISTORY", payload: history });
    console.log("history added");
    //  if (isAuto) await AsyncStorage.setItem("uid", result.user.uid);
  } catch (err) {
    //    dispatch({ type: "ADD_ERROR", payload: err });
  }
  //dispatch({ type: "IS_LOADING", payload: false });
};

export const { Provider, Context } = createDataContext(
  MoodReducer,
  {
    selectMood,
    loadMood,
    syncDbWithContext,
    getLoverDataFromDb,
    selectActivity,
    getRequestsFromDb,
    getResponseFromDb,
    addToHistory,
  },
  {
    Response: "",
    Request: "",
    CurrentMood: "",
    ImgProfile: "",
    LoverId: "",
    CurrentMoodLover: "",
    ImgProfileLover: "",
    IsAvailable: "",
    IsAvailableLover: "",
    CurrentActivity: "",
    CurrentActivityLover: "",
    HistoryLover: "",
  }
);

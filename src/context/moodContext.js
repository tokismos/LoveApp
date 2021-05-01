import createDataContext from "./createDataContext";
import { db, auth } from "../helpers/db";
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
        Request: action.payload.Request,
        Response: action.payload.Response,
      };
    case "SYNCLOVER":
      return {
        ...state,
        CurrentMoodLover: action.payload.CurrentMoodLover,
        ImgProfileLover: action.payload.ImgProfileLover,
        IsAvailableLover: action.payload.IsAvailableLover,
        CurrentActivityLover: action.payload.CurrentActivityLover,
        HistoryLover: action.payload.HistoryLover,
        ExpoLoverNotif: action.payload.ExpoLoverNotif,
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
    console.log("erf data:", data);
    dispatch({
      type: "SYNC",
      payload: {
        CurrentMood: data.CurrentMood,
        ImgProfile: data.ImgProfile,
        LoverId: data.LoverId,
        IsAvailable: data.IsAvailable,
        CurrentActivity: data.CurrentActivity,
        Response: data.Response,
        Request: data.Request,
      },
    });
  });
};
//<---- END

// Begin---->Fetch data of the loverId from the db and add it to the lover context
const getLoverDataFromDb = (dispatch) => (loverId) => {
  return new Promise(async (resolve, reject) => {
    await db.ref(`users/${loverId}`).on("value", (snapshot) => {
      const data = snapshot.val();
      dispatch({
        type: "SYNCLOVER",
        payload: {
          CurrentMoodLover: data.CurrentMood,
          ImgProfileLover: data.ImgProfile,
          IsAvailableLover: data.IsAvailable,
          CurrentActivityLover: data.CurrentActivity,
          HistoryLover: data.History,
          ExpoLoverNotif: data.ExpoNotification,
        },
      });
      resolve();
    });
  });
};
// <---- End

const selectActivity = (dispatch) => async (activity, callback) => {
  try {
    await db.ref(`users/${auth.currentUser.uid}/CurrentActivity`).set(activity);
    await db.ref(`users/${auth.currentUser.uid}/History`).push(activity);
    dispatch({ type: "ADD_HISTORY", payload: activity });

    // const date = new Date();
    // const time = date.getHours() + " " + date.getMinutes();
    // console.log("this is time in js", time);
    // console.log(
    //   "this is time in firebase",
    //   firebase.database.ServerValue.TIMESTAMP
    // );
    dispatch({ type: "SELECT_ACTIVITY", payload: activity });
    callback();
  } catch (err) {
    console.log(err);
  }
};

const selectMood = (dispatch) => async (mood, callback) => {
  try {
    await db.ref(`users/${auth.currentUser.uid}/CurrentMood`).set(mood);
    await db.ref(`users/${auth.currentUser.uid}/History`).push(mood);
    callback();
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
    ExpoLoverNotif: "",
  }
);

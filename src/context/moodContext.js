import createDataContext from "./createDataContext";
import { db, auth, getDatafromDb } from "../helpers/db";
const MoodReducer = (state, action) => {
  switch (action.type) {
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
      };
    case "SYNCLOVER":
      return {
        ...state,
        CurrentMoodLover: action.payload.CurrentMoodLover,
        ImgProfileLover: action.payload.ImgProfileLover,
        IsAvailableLover: action.payload.IsAvailableLover,
      };
    default:
      return;
  }
};

const loadMood = (dispatch) => (mood) => {
  dispatch({ type: "SET_MOOD", payload: CurrentMood });
};

// Begin----> fetch data from db and save it in context for the current user
const syncDbWithContext = (dispatch) => async () => {
  console.log("before db context");

  await db.ref(`users/${auth.currentUser.uid}`).on("value", (snapshot) => {
    console.log("inside db context");
    const data = snapshot.val();
    dispatch({
      type: "SYNC",
      payload: {
        CurrentMood: data.CurrentMood,
        ImgProfile: data.ImgProfile,
        LoverId: data.LoverId,
        IsAvailable: data.IsAvailable,
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
        },
      });
      resolve();
    });
  });
};
// <---- End

const selectMood = (dispatch) => async (mood) => {
  try {
    console.log(auth.currentUser.uid);
    await db.ref(`users/${auth.currentUser.uid}/CurrentMood`).set(mood);
    dispatch({ type: "SELECT_MOOD", payload: CurrentMood });
    console.log("mood selected");
    //  if (isAuto) await AsyncStorage.setItem("uid", result.user.uid);
  } catch (err) {
    //    dispatch({ type: "ADD_ERROR", payload: err });
  }
  //dispatch({ type: "IS_LOADING", payload: false });
};

export const { Provider, Context } = createDataContext(
  MoodReducer,
  { selectMood, loadMood, syncDbWithContext, getLoverDataFromDb },
  {
    CurrentMood: null,
    ImgProfile: null,
    LoverId: null,
    CurrentMoodLover: null,
    ImgProfileLover: null,
    IsAvailable: null,
    IsAvailableLover: null,
  }
);

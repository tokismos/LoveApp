import createDataContext from "./createDataContext";
import { db, auth } from "../helpers/db";
const MoodReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOOD":
      return { ...state, currentMood: action.payload };
    case "SELECT_MOOD":
      return { ...state, currentMood: action.payload };
    default:
      return;
  }
};

const loadMood = (dispatch) => (mood) => {
  dispatch({ type: "SET_MOOD", payload: mood });
};

const selectMood = (dispatch) => async (mood) => {
  try {
    console.log(auth.currentUser.uid);
    await db.ref(`users/${auth.currentUser.uid}/Mood`).set(mood);
    dispatch({ type: "SELECT_MOOD", payload: mood });
    console.log("mood selected");
    //  if (isAuto) await AsyncStorage.setItem("uid", result.user.uid);
  } catch (err) {
    //    dispatch({ type: "ADD_ERROR", payload: err });
  }
  //dispatch({ type: "IS_LOADING", payload: false });
};

export const { Provider, Context } = createDataContext(
  MoodReducer,
  { selectMood, loadMood },
  { currentMood: "" }
);

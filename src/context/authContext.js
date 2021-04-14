import { auth } from "../helpers/db";

import createDataContext from "./createDataContext";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SignIn":
      return { ...state, uid: action.payload, error: "" };
    default:
      return;
  }
};

const signIn = (dispatch) => async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("signed in");
    //  if (isAuto) await AsyncStorage.setItem("uid", result.user.uid);
  } catch (err) {
    //    dispatch({ type: "ADD_ERROR", payload: err });
  }
  //dispatch({ type: "IS_LOADING", payload: false });
};

export const { Provider, Context } = createDataContext(
  AuthReducer,
  { signIn },
  { error: "", uid: "", isLoading: false, user: null }
);

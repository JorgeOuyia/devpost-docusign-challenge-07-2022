import { firebase } from "../util/firebase";
import { addNotification, NotificationType } from "../util/notification";

const DATA_INICIAL = {
  loading: false,
};

const LOADING_LOGIN = "LOADING_LOGIN";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGOFF_SUCCESS = "USER_LOGOFF_SUCCESS";
const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';

export default function userReducer(state = DATA_INICIAL, action) {
  let result = { ...state };

  switch (action.type) {
    case LOADING_LOGIN:
      result = { ...state, loading: action.payload };
      break;
    case USER_LOGIN_SUCCESS:
      result = { ...state, user: action.payload };
      break;
    case USER_LOGOFF_SUCCESS:
      result = { ...state, user: action.payload };
      break;
  }

  return result;
}

export const loginAction =
  (email, password, notificationList, setter) => async (dispatch, getState) => {
    dispatch({
      type: LOADING_LOGIN,
      payload: true,
    });

    try {
      const loginResult = await firebase.signInWithEmailAndPassword(
        email,
        password
      );
      const user = await firebase.getUser(loginResult.user.uid);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: user,
      });
    } catch (error) {
      let notification = null;
      switch (error.code) {
        case "auth/user-not-found":
          notification = "There is no user with that email";
          break;
        case "auth/wrong-password":
          notification = "Incorrect password";
          break;
        case "auth/too-many-requests":
          notification =
            "This account has been blocked due to too many failed requests";
          break;
      }
      if (notification) {
        addNotification(notificationList, notification, NotificationType.Error);
        setter([...notificationList]);
      }
    } finally {
      dispatch({
        type: LOADING_LOGIN,
        payload: false,
      });
    }
  };

export const registerAction =
  (name, surname, email, password, notificationList, setter) =>
  async (dispatch, getState) => {
    dispatch({
      type: LOADING_LOGIN,
      payload: true,
    });

    try {
      const registerResult = await firebase.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = await firebase.createUser(
        registerResult.user.uid,
        name,
        surname,
        email
      );
      if (user) {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: user,
        });
      }
    } catch (error) {
      console.log(error.code);
      let notification = error.message;
      switch (error.code) {
        case "auth/email-already-in-use":
          notification = "The email is already registered";
          break;
        case "auth/invalid-email":
          notification = "The email that you have entered is not valid";
          break;
        case "auth/weak-password":
          notification =
            "The password is too weak. It must have at least 6 characters";
          break;
      }
      addNotification(notificationList, notification, NotificationType.Error);
      setter([...notificationList]);
    } finally {
      dispatch({
        type: LOADING_LOGIN,
        payload: false,
      });
    }
  };

export const logOffAction = () => async (dispatch, getState) => {
  try {
    firebase.signOut();
    dispatch({
      type: USER_LOGOFF_SUCCESS,
      payload: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const readUserAction = (user) => async (dispatch, getState) => {
  if (user) {
    const firebaseUser = await firebase.getUser(user.uid);

    if (firebaseUser) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: firebaseUser,
      });
    } else {
      await firebase.signOut();
    }
  }
};

export const changePasswordAction = (email, notificationList, setter) => async(dispatch, getState) => {
  dispatch({
    type: LOADING_LOGIN,
    payload: true
  });

  try {
    await firebase.sendPasswordResetEmail(email);
    addNotification(notificationList, 'Email sent!', NotificationType.Success);
    setter([...notificationList]);
    dispatch({
      type: USER_CHANGE_PASSWORD_SUCCESS
    });
  }
  catch (error) {
    console.log(error.code);
    console.log(error.message);
    addNotification(notificationList, error.message, NotificationType.Error);
    setter([...notificationList]);
  }
  finally {
    dispatch({
      type: LOADING_LOGIN,
      payload: false
    })
  }
}
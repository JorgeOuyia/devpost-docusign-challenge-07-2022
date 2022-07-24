import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { uuidv4 } from "@firebase/util";

const firebaseConfig = {
  apiKey: "AIzaSyBHoPhl8Xz60EArp6yCgIoBW1fM4xNqpMc",
  authDomain: "jgi-chimpanzees.firebaseapp.com",
  projectId: "jgi-chimpanzees",
  storageBucket: "jgi-chimpanzees.appspot.com",
  messagingSenderId: "1024836977232",
  appId: "1:1024836977232:web:00bab3b5d90cce49d58755",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export const firebase = {
  onAuthStateChanged: (user) => onAuthStateChanged(auth, user),
  signInWithEmailAndPassword: (email, password) =>
    signInWithEmailAndPassword(auth, email, password),
  signOut: () => signOut(auth),
  createUserWithEmailAndPassword: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),
  sendPasswordResetEmail: (email) => sendPasswordResetEmail(auth, email),
  createSurvey: async (survey, uid) => {
    console.log('llamada a Firebase createSurvey!!');
    let result;

    try {
      let surveyList = await firebase.getSurveyList(uid);

      if (!surveyList) {
        surveyList = [];
      }

      const userSurveyRef = doc(firestore, "surveys", uid);

      const docToSave = { ...survey };

      await setDoc(userSurveyRef, {
        surveyList: [...surveyList, docToSave],
      });

      result = { ...docToSave };
    } catch (error) {
      console.log(error);
      result = null;
    }
  },
  createUser: async (uid, name, surname, email) => {
    console.log('llamada a Firebase createUser!!');
    let result;

    try {
      const newUser = {
        uid,
        name,
        surname,
        email,
      };

      const userDocRef = doc(firestore, "users", uid);
      await setDoc(userDocRef, newUser);

      result = { ...newUser };
    } catch (error) {
      console.log(error);
      result = null;
    }

    return result;
  },
  getSurveyList: async (uid) => {
    console.log('llamada a Firebase getSurveyList!!');
    let result = null;

    try {
      const surveysRef = doc(firestore, "surveys", uid);
      const docSnap = await getDoc(surveysRef);
      if (docSnap.exists()) {
        result = docSnap.data().surveyList;
      }
      else {
        result = [];
      }
    } catch (error) {
      console.log(error);
      result = null;
    }

    return result;
  },
  getUser: async (uid) => {
    console.log('llamada a Firebase getUser!!');
    let result = null;

    try {
      const userDocRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        result = docSnap.data();
      }
    } catch (error) {
      console.log(error);
      result = null;
    }

    return result;
  },
  getSurvey: async (uid, objectId) => {
    console.log('llamada a Firebase getSurvey!!');
    let result = null;

    try {
      const surveyList = await firebase.getSurveyList(uid);

      result = surveyList.find((t) => t.objectId === parseInt(objectId));
    } catch (error) {
      console.log(error);
      result = null;
    }

    return result;
  },
};

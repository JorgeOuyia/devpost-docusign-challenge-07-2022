import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBIaXKvNhEtUNd14gxNG8zgHqX-Ajetby8",
    authDomain: "arc-valet-sign.firebaseapp.com",
    projectId: "arc-valet-sign",
    storageBucket: "arc-valet-sign.appspot.com",
    messagingSenderId: "344479736640",
    appId: "1:344479736640:web:d7a0e6aced3eb09ca050a5"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export const firebase = {

    onAuthStateChanged: (user) => onAuthStateChanged(auth, user),
    signInWithEmailAndPassword: (email, password) => signInWithEmailAndPassword(auth, email, password),
    signOut: () => signOut(auth),
    createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    sendPasswordResetEmail: (email) => sendPasswordResetEmail(auth, email),
    createUser: async(uid, name, surnname, email) => {
        
        let result;

        try {

            const newUser = {
                uid,
                name,
                surnname,
                email
            }

            const userDocRef = doc(firestore, 'users', uid);
            await setDoc(userDocRef, newUser);

            result = newUser;
        }
        catch (error) {
            console.log(error);
            result = null;
        }

        return result;
    },
    getUser: async(uid) => {
        let result = null;

        try {
            const userDocRef = doc(firestore, 'users', uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                result = docSnap.data();
            }
        }
        catch(error) {
            console.log(error);
            result = null;
        }

        return result;
    }
}
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDQh1C4_lzXeIgeGmvjuT9uXjkBsB6H3Ag',
  authDomain: 'crwn-db-abbd9.firebaseapp.com',
  databaseURL: 'https://crwn-db-abbd9.firebaseio.com',
  projectId: 'crwn-db-abbd9',
  storageBucket: 'crwn-db-abbd9.appspot.com',
  messagingSenderId: '584875069915',
  appId: '1:584875069915:web:ab57aa5eac5a34ce0cd7fe',
  measurementId: 'G-XPXM092C2Q',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      constructor('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

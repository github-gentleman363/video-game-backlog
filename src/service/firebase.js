import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";
import {BACKLOG_COLUMN_TYPE_DB_KEY_MAP} from "../constants";

// Your web app's Firebase configuration
// https://medium.com/@paulbreslin/is-it-safe-to-expose-your-firebase-api-key-to-the-public-7e5bd01e637b
const firebaseConfig = Object.freeze({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: "video-game-backlog",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
export const FIREBASE_UI_CONFIG = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
};

export const FIREBASE_AUTH = firebase.auth();

const DB = firebase.database();

const getDBRefPath = () => `/${FIREBASE_AUTH.currentUser.uid}/`;

const convertBacklog = (backlog) => backlog && Object.keys(backlog).reduce((acc, cur) => {
    acc[BACKLOG_COLUMN_TYPE_DB_KEY_MAP[cur]] = backlog[cur];
    return acc;
}, {});

export const updateBacklog = (backlog) => DB.ref(getDBRefPath()).set(convertBacklog(backlog));

export const listenToBacklog = () => DB.ref(getDBRefPath()).once("value").then((snapshot) => convertBacklog(snapshot?.val()));
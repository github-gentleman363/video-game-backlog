import firebase from 'firebase';
import {BACKLOG_COLUMN_TYPE} from "../constants";

// Your web app's Firebase configuration
const firebaseConfig = Object.freeze({
    apiKey: "AIzaSyDmup7TKympQ8oTicpq4I5mxWN8Y2sahPA",
    authDomain: "video-game-backlog.firebaseapp.com",
    databaseURL: "https://video-game-backlog.firebaseio.com",
    projectId: "video-game-backlog",
    storageBucket: "video-game-backlog.appspot.com",
    messagingSenderId: "161569083282",
    appId: "1:161569083282:web:2a9d48b9cbdeda88febb4b"
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const DB = firebase.database();

const userId = "yjw9012";

const getDBRefPath = (type = BACKLOG_COLUMN_TYPE.TO_DO, key) => `/backlog/${userId}/${type}${key ? `/${key}` : ""}`;

export const updateBacklog = (type, key, val) => {
    DB.ref(getDBRefPath(type, key)).set(val);
};

export const listenToBacklog = (type, callback) => {
    DB.ref(getDBRefPath(type)).on("value", (snapshot) => {
        callback(snapshot.val());
    });
};
import firebase from 'firebase';

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

export default firebase.database();
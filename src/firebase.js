// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration, replace it with your project keys
const firebaseConfig = {
    apiKey: 'AIzaSyBABeNq0PBwazEfCdVqcpxmdOzaWNQowSc',
    authDomain: 'authentication-app-796bb.firebaseapp.com',
    databaseURL: 'https://authentication-app-796bb-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'authentication-app-796bb',
    storageBucket: 'authentication-app-796bb.appspot.com',
    messagingSenderId: '833644636332',
    appId: '1:833644636332:web:880c6f1062292c87fa5709',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

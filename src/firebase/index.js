import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqnRpbhtUk7elRAZrHFvVzRtiMbqC5Z7k",
    authDomain: "bdpros1a.firebaseapp.com",
    projectId: "bdpros1a",
    storageBucket: "bdpros1a.appspot.com",
    messagingSenderId: "137556014417",
    appId: "1:137556014417:web:623b47d916b96da26acf70"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export{
    db                                                        
}
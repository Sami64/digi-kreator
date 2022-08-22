// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBJCBRcoS0a-qx1ikT9M2Y5lJR62KGU3c4",
	authDomain: "digikoncept-7abfd.firebaseapp.com",
	projectId: "digikoncept-7abfd",
	storageBucket: "digikoncept-7abfd.appspot.com",
	messagingSenderId: "1041066865603",
	appId: "1:1041066865603:web:e119ef27b2a1d371578376",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

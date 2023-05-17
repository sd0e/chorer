import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyBspz-KyEaxAoCafg1Mo_UGSZrCiQU0G4Y",
	authDomain: "chorer-app.firebaseapp.com",
	projectId: "chorer-app",
	storageBucket: "chorer-app.appspot.com",
	messagingSenderId: "85144318866",
	appId: "1:85144318866:web:44690d44ae800bd42a074b"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
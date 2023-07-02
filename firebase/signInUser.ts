import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// initialises Firebase authentication component
const auth = getAuth();

const signInUser = (email: string, password: string) => {
	// returns Promise so that client can await the request for whether the request is successful
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const user = result.user;
				resolve(user);
			}).catch((error) => {
				reject(error);
			});
	});
}

export default signInUser;
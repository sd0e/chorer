import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// initialises Firebase authentication component
const auth = getAuth();

const signInUser = (email: string, password: string) => {
	// returns Promise so that client can await the request for whether the request is successful
	return new Promise((resolve, reject) => {
		if (!email.includes('@')) {
			reject('Email is not in the correct format');
			return;
		} else if (email.length === 0 || password.length === 0) {
			reject('The textboxes must have some content');
			return;
		}
		
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
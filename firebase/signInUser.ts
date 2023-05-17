import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signInUser = (email: string, password: string) => {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const user = result.user;
				resolve(user);
			}).catch((error) => {
				const errorMessage = error.message;
				reject(errorMessage);
			});
	});
}

export default signInUser;
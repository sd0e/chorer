import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const createUser = (email: string, password: string) => {
	return new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const user = result.user;
				resolve(user);
			}).catch((error) => {
				const errorMessage = error.message;
				reject(errorMessage);
			});
	});
}

export default createUser;
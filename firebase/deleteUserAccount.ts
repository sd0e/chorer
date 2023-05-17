import { getAuth, deleteUser, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

const deleteUserAccount = () => {
	const auth = getAuth();

	const deleteAccount = (user: User) => {
		return new Promise((resolve, reject) => {
			deleteUser(user).then(() => {
				resolve(null);
			}).catch(error => {
				window.alert(`Sorry, something went wrong deleting your account. Please refresh and try again.\n\nError: ${error}`);
			});
		});
	}

	return new Promise((resolve, reject) => {
		const provider = new GoogleAuthProvider();

		const currentUser = auth.currentUser;

		if (currentUser) deleteAccount(auth.currentUser).then(() => resolve(null)).catch(() => reject());
	});
}

export default deleteUserAccount;
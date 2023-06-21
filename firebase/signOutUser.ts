import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const signOutUser = () => {
	// calls the Firebase server to remove the user's session from the cache
	signOut(auth);
}

export default signOutUser;
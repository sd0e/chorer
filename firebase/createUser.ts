import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Post } from "@/api";

const auth = getAuth();

const createUser = (email: string, password: string) => {
	return new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const user = result.user;
				
				Post('/createuser', { email: email })
					.then(res => {
						if (res.success) {
							resolve(user);
						} else {
							reject();
						}
					})
					.catch(() => reject())
			}).catch((error) => {
				reject(error);
			});
	});
}

export default createUser;
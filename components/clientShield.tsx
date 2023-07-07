import getSessionFeature, { Feature } from "@/scripts/getSessionFeature";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { NextRouter } from "next/router";

// ClientShield method: page begins with this method to either redirect to Auth screen if not signed in, Onboarding screen if
// process not complete or Pending page if waiting for approval
export default async function ClientShield(router: NextRouter, redirectOnboarding: boolean | null | undefined = true, redirectPending: boolean | null | undefined = true) {
	const auth = getAuth();

	onAuthStateChanged(auth, (currentUser) => {
		if (!currentUser) {
			// no user is signed in, redirect to auth screen
			router.push('/auth');
			return;
		} else {
			const hasOnboarded = getSessionFeature(Feature.HasOnboarded);
			const status = getSessionFeature(Feature.Status);
			console.log(hasOnboarded);

			if (!hasOnboarded && redirectOnboarding) {
				router.push('/onboarding');
				return;
			} else if (status === 'pending' && redirectPending) {
				router.push('/pending');
				return;
			} else {
				return true;
			}
		}
	});
}
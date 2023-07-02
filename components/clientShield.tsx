import getSessionFeature, { Feature } from "@/scripts/getSessionFeature";
import { getAuth } from "firebase/auth";
import { NextRouter } from "next/router";

// ClientShield method: page begins with this method to either redirect to Auth screen if not signed in, Onboarding screen if
// process not complete or Pending page if waiting for approval
export default function ClientShield(router: NextRouter, redirectOnboarding: boolean | null | undefined = true, redirectPending: boolean | null | undefined = true ) {
	const currentUser = getAuth().currentUser;
	const session = localStorage.session;

	if (!currentUser || !session) {
		// no user is signed in, redirect to auth screen
		router.push('/auth');
	} else {
		const hasOnboarded = getSessionFeature(Feature.HasOnboarded);
		const status = getSessionFeature(Feature.Status);

		if (!hasOnboarded && redirectOnboarding) {
			router.push('/onboarding');
		} else if (status === 'pending' && redirectPending) {
			router.push('/pending');
		}
	}
}
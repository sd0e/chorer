// defines enum of possible session values which can be returned
export enum Feature {
	HasOnboarded = "hasOnboarded",
	Name = "name",
	Status = "status",
	AppliedHousehold = "appliedHousehold",
	Email = "email",
	WeekStartMonday = "weekStartMonday",
	HouseholdName = "householdName",
	IsAdmin = "isAdmin",
	IsOwner = "isOwner"
}

// returns the value of a session feature in localStorage, preventing user from having to deal with parsing issues
export default function getSessionFeature(featureName: Feature) {
	const session = localStorage.session;
	if (!session) {
		window.location.href = '/auth';
		return undefined;
	} else {
		const parsedSession = JSON.parse(session);
		return parsedSession[featureName];
	}
}
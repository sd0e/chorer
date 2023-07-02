// defines enum of possible session values which can be returned
export enum Feature {
	HasOnboarded = "hasOnboarded",
	Name = "name",
	Status = "status",
	AppliedHousehold = "appliedHousehold",
	Email = "email",
	WeekStartMonday = "weekStartMonday",
	HouseholdName = "householdName"
}

// returns the value of a session feature in localStorage, preventing user from having to deal with parsing issues
export default function getSessionFeature(featureName: Feature) {
	const session = localStorage.session;
	if (!session) return undefined;
	const parsedSession = JSON.parse(session);
	return parsedSession[featureName];
}
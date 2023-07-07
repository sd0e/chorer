// import necessary libraries

import { Get } from '@/api';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import getSessionFeature, { Feature } from '@/scripts/getSessionFeature';
import classes from '@/styles/Pending.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// pending.tsx: displays when user has applied for a household but has not yet been accepted or rejected
export default function Pending() {
	const router = useRouter();
	ClientShield(router, true, false);

	// update session info on each refresh in case application status has changed
	useEffect(() => {
		Get('/newsession').then(sessionInfo => {
			if (sessionInfo && sessionInfo.response && sessionInfo.response.status && sessionInfo.response.status === 'accepted') router.push('dashboard');
			localStorage.session = JSON.stringify(sessionInfo.response);
		});
	}, []);

	const appliedHousehold = getSessionFeature(Feature.AppliedHousehold);

	// returns centered text displaying information on request
	return (
		<Layout title="Pending">
			<div className={classes.content}>
			<span>Your application to household of ID {appliedHousehold} is pending.</span>
			</div>
		</Layout>
	)
}

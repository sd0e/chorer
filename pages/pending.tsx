// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import { InterClass } from '@/font';
import getSessionFeature, { Feature } from '@/scripts/getSessionFeature';
import classes from '@/styles/Pending.module.css';
import { useRouter } from 'next/router';

// pending.tsx: displays when user has applied for a household but has not yet been accepted or rejected
export default function Pending() {
	const router = useRouter();
	ClientShield(router, true, false);

	const appliedHousehold = getSessionFeature(Feature.AppliedHousehold);

	// returns centered text displaying information on request
	return (
		<Layout title="Pending">
			<div className={[classes.content, InterClass].join(',')}>
			<span>Your application to household of ID {appliedHousehold} is pending.</span>
			</div>
		</Layout>
	)
}

// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import StatsDisplay from '@/components/ui/statsDisplay';
import { useEffect, useState } from 'react';
import { Get } from '@/api';
import hasPrivileges from '@/scripts/hasPrivileges';

// returns the page component to be served over relevant route
export default function Statistics() {
  // ensures page is only served when authenticated
  const router = useRouter();
  ClientShield(router);

  // define stats storage
  const [stats, setStats] = useState<any | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // load statistics upon page rendering
  useEffect(() => {
    setLoadingStats(true);
    Get('/getstats').then(stats => {
      if (stats.success) setStats(stats.response);
      setLoadingStats(false);
    });
  }, []);

  const userHasPrivileges = hasPrivileges();
  
  // return page component containing boxes of statistics with components defined earlier
  return (
    <Layout title="Statistics" leftMenu>
      <div className={styles.content}>
        { !loadingStats && stats ? <Stack direction="column" spacing={4}>
          { userHasPrivileges ? <StatsDisplay Title="Currently" Stats={[
            {"name": "Total Chores Overdue", "amount": stats.admin.numberOverdue},
            {"name": "Submissions To Approve", "amount": stats.admin.numberSubmitted}
          ]} /> : null }
          <StatsDisplay Title="Your Overall Statistics" Stats={[
            { name: "Chores Assigned To", amount: stats.numberChoresAssignedTo ? stats.numberChoresAssignedTo : 0 },
            { name: "Chores On Time", amount: stats.choresSubmittedOnTime ? stats.choresSubmittedOnTime : 0 },
            { name: "Late Chores", amount: stats.choresSubmittedLate ? stats.choresSubmittedLate : 0 },
            { name: "Average Time Overdue", amount: `${stats.hourTimesOverdue && stats.hourTimesOverdue.length > 0 ? stats.hourTimesOverdue.reduce((prev: any, curr: any) => prev + curr)/stats.hourTimesOverdue.length : 0}h` },
            { name: "Chores Assigned By", amount: stats.numberChoresAssignedBy ? stats.numberChoresAssignedBy : 0 }
            ]} />
        </Stack> : <span>Loading</span> }
      </div>
    </Layout>
  )
}

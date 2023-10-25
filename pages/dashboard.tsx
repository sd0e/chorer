// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import hasPrivileges from '@/scripts/hasPrivileges';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';

import { createTheme, Stack, ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SingleMenuItem from '@/components/ui/singleMenuItem';
import { Face, List, TaskAltOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Get, Post } from '@/api';
import IndividualChore from '@/components/ui/individualChore';
import { utcToRelative } from 'utctorelative';
import StatsDisplay from '@/components/ui/statsDisplay';

// returns the page component to be served over relevant route
export default function Dashboard() {
  const router = useRouter();
  ClientShield(router);

  const userHasPrivileges = hasPrivileges();

  // define selected section
  const [toggleSelection, setToggleSelection] = useState('you');

  // define data storage
  const [yourAssignedChores, setYourAssignedChores] = useState<any>(null);
  const [loadingYourAssignedChores, setLoadingYourAssignedChores] = useState(true);

  const [allAssignedChores, setAllAssignedChores] = useState<any>(null);
  const [loadingAllAssignedChores, setLoadingAllAssignedChores] = useState(false);

  const [stats, setStats] = useState<any>(null);

  // fetch chore information, including all chores if admin
  const fetchYourAssignedChores = () => {
    setLoadingYourAssignedChores(true);
    Get('/getassignedchores').then(yourAssignedChores => {
      if (yourAssignedChores.success) setYourAssignedChores(yourAssignedChores.response);
      setLoadingYourAssignedChores(false);
    });
  }

  const fetchAll = () => {
    fetchYourAssignedChores();

    if (userHasPrivileges) {
      setLoadingAllAssignedChores(true);
      Get('/getallassignedchores').then(yourAssignedChores => {
        if (yourAssignedChores.success) setAllAssignedChores(yourAssignedChores.response);
        setLoadingAllAssignedChores(false);
      });

      Get('/getstats').then(stats => {
        if (stats.success) setStats(stats.response);
      })
    }
  }

  // fetch all chore data on first load
  useEffect(() => {
    fetchAll();
  }, []);

  // sends a request to the server to submit the chore directly from the dashboard
  const submitChore = (id: string) => {
    Post('/submitchore', {
      id: id,
      value: true
    }).then(() => {
      fetchAll();
    });
  }

  // define theme to set fonts
  const theme = createTheme({
    typography: {
      fontFamily: '"Inter", sans-serif',
    },
  });
  
  // return page component
  return (
    <Layout title="Dashboard" leftMenu>
      <div className={styles.content}>
        <ThemeProvider theme={theme}>
          <Stack direction="column" spacing={4}>
            { userHasPrivileges ? (stats ? <StatsDisplay Title="Administrator Statistics" Stats={[
              {"name": "Total Chores Overdue", "amount": stats.admin.numberOverdue},
              {"name": "Submissions To Approve", "amount": stats.admin.numberSubmitted}
            ]} /> : <span>Loading...</span>) : null }
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <SingleMenuItem Title="Chores" Icon={TaskAltOutlined} Color="#4d3c6c" />
              { userHasPrivileges ? <ToggleButtonGroup value={toggleSelection} exclusive onChange={(_, newValue) => setToggleSelection(newValue)} aria-label="Chore list">
                <ToggleButton value="you" aria-label="Chores assigned to you" color="warning">
                  <Face fontSize="small" style={{ marginRight: '12px' }} /> You
                </ToggleButton>
                <ToggleButton value="all" aria-label="Chores assigned to all members" color="secondary">
                  <List fontSize="small" style={{ marginRight: '12px' }} /> All
                </ToggleButton>
              </ToggleButtonGroup> : null }
            </Stack>
            <Stack direction="column" spacing={2}>
              { toggleSelection === 'you' ? ( loadingYourAssignedChores ? <span>Loading</span> : <>{
                yourAssignedChores.map((chore: any) => {
                  return <IndividualChore title={chore.name} due={utcToRelative(chore.dueTime)} overdue={new Date().getTime() > chore.dueTime} isPersonal={true} onClick={() => router.push(`/chore/${chore._id}`)} key={chore._id} onSubmit={() => submitChore(chore._id)} />
                })
              }</> ) : ( loadingAllAssignedChores ? <span>Loading</span> : <>{
                allAssignedChores.map((chore: any) => {
                  return <IndividualChore key={chore._id} title={chore.name} due={utcToRelative(chore.dueTime)} overdue={new Date().getTime() > chore.dueTime} isPersonal={false} onClick={() => router.push(`/chore/${chore._id}`)} />
                })
              }</> ) }
            </Stack>
          </Stack>
        </ThemeProvider>
      </div>
    </Layout>
  )
}

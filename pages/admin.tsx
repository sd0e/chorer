/* eslint-disable @next/next/no-img-element */
// import necessary libraries

import { Get, Post } from '@/api';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import hasPrivileges from '@/scripts/hasPrivileges';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, createTheme, Stack } from '@mui/material';

// import page styles
import classes from '@/styles/Admin.module.css';
import { CancelOutlined, CheckCircleOutlined } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import { InterClass } from '@/font';
import { utcToRelative } from 'utctorelative';

// returns the page component to be served over relevant route
export default function AdminConsole() {
  const router = useRouter();
  ClientShield(router);

  const userHasPrivileges = hasPrivileges();

  // fetch chores from API
  const [pendingChores, setPendingChores] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  const refreshChores = () => {
    setLoading(true);
    Get('/getsubmittedchores').then((submittedChores: any) => {
      setPendingChores(JSON.stringify(submittedChores.response));
      setLoading(false);
    });
  }

  useEffect(() => {
    refreshChores();
  }, []);

  // make current chores into a usable form conforming to type requirements
  const currentPendingChores = typeof pendingChores === 'string' ? JSON.parse(pendingChores) : [];
  const currentChore: any | null = currentPendingChores[0];

  let submitter;
  if (currentChore) submitter = currentChore.userList.filter((el: any) => el._id === currentChore.currentAssignee)[0].name;

  // sends a request to the server to approve the chore and complete the associated actions
  const approveCurrentChore = () => {
    Post('/approvechore', {
      id: currentChore._id
    }).then(() => refreshChores());
  }

  // calls the same API endpoint the user calls to submit the chore, but in this circumstance it revokes the submission
  const rejectCurrentChore = () => {
    Post('/submitchore', {
      id: currentChore._id,
      value: false
    }).then(() => refreshChores());
  }

  // define type for buttons
  const theme = createTheme({
    typography: {
      fontFamily: '"Inter", sans-serif'
    }
  });
  
  return (
    <Layout title="Admin Console" leftMenu>
      <ThemeProvider theme={theme}>
        {userHasPrivileges ? <div className={[styles.content, InterClass].join(' ')}>
          { loading ? <span>Loading</span> : <div className={classes.admin}>
            { currentPendingChores.length === 0 || !currentChore ? <span>No more chores left to review!</span> : <Stack spacing={2} direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
              <span className={classes.adminnumberSubmissions}>{currentPendingChores.length} pending submission{currentPendingChores.length === 1 ? '' : 's'}</span>
              <Stack direction="column" spacing={4} alignItems="center">
                { currentChore.proofFile ? <img src={currentChore.proofFile} alt="Uploaded image proof" className={classes.image} /> : null }
                <Stack direction="column" spacing={2} alignItems="center">
                  <span>{currentChore.name}</span>
                  <span className={classes.subtext}>{utcToRelative(currentChore.dueTime)}</span>
                  <span className={classes.subtext}>Submitted by {submitter}</span>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button variant="text" color="success" onClick={approveCurrentChore}>
                  <CheckCircleOutlined />
                  <span style={{ letterSpacing: '0.15rem', marginLeft: 24 }}>Approve</span>
                </Button>
                <Button variant="text" color="error" onClick={rejectCurrentChore}>
                  <CancelOutlined />
                  <span style={{ letterSpacing: '0.15rem', marginLeft: 24 }}>Reject</span>
                </Button>
              </Stack>
            </Stack> }
          </div> }
        </div> : <span>You do not have sufficient privileges to access this page.</span>}
      </ThemeProvider>
    </Layout>
  )
}

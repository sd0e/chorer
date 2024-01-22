// import required libraries to make the page function
import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';
import { useRouter } from 'next/router';
import ClientShield from '@/components/clientShield';
import { TextField, ToggleButton, ToggleButtonGroup, Button, Stack} from '@mui/material';
import { useState } from 'react';
import { Get, Post } from '@/api';

export default function Onboarding() {
  // implement a ClientShield so that the page only loads if the user has been authorised
  const router = useRouter();
  ClientShield(router, false);

  const [applicationType, setApplicationType] = useState();
  const [householdId, setHouseholdId] = useState('');
  const [name, setName] = useState('');
  const [householdName, setHouseholdName] = useState('');

  const updateApplicationType = (newApplicationType: any) => {
    setApplicationType(newApplicationType);
  }

  // called when user clicks Apply button, adds information to database to say that they have applied to the household
  const apply = async () => {
    if (householdName.length > 20) {
      window.alert('Household name too long');
      return;
    }

    if (householdId.length !== 8) {
      window.alert('Check that your ID is of the correct format');
      return;
    }

    const res = await Post('/apply', { id: householdId, name: name });
    if (res.response === 'Household does not exist') {
      window.alert('Household does not exist');
    } else {
      if (res.success) {
        // updates session
        localStorage.session = JSON.stringify((await Get('newsession')).response);
        // routes user to pending page if the API call was a success
        router.push('/pending');
      } else {
        console.log(res);
        window.alert('There was an issue.');
      };
    }
  }

  // called when user clicks Create button, creates a household and assigns that user to the household
  const create = async () => {
    if (householdName.length > 20) {
      window.alert('Household name too long');
      return;
    }

    const res = await Post('/newhousehold', { householdName: householdName, name: name });
    if (res.success) {
      // updates session
      localStorage.session = JSON.stringify((await Get('newsession')).response);
      // routes user to dashboard page if the API call was a success
      router.push('/dashboard');
    } else {
      window.alert('There was an issue.');
    };
  }

  // return a JSX component to be served on the /onboarding route
  return (
    <Layout title="Sign Up">
      <div className={classes.content}>
        <h2 className={classes.headTag}>Onboarding</h2>
        <TextField label="Name" variant="outlined" onChange={e => setName(e.target.value)} style={{ marginBottom: '3rem' }} />
        <p className={classes.subheading}>Would you like to join or create a household?</p>
        <ToggleButtonGroup value={applicationType} onChange={(_, newApplicationType) => updateApplicationType(newApplicationType)} exclusive={true}>
          <ToggleButton value="join" key="join">
            Join a Household
          </ToggleButton>
          <ToggleButton value="create" key="create">
            Create a Household
          </ToggleButton>
        </ToggleButtonGroup>
        { applicationType ? <div className={classes.subpage}>
          {applicationType === 'join' ? <>
            { /* page if user chooses join option */}
            <Stack direction="column" spacing={4}>
              <TextField label="Household ID" variant="outlined" onChange={e => setHouseholdId(e.target.value)} />
              <Button variant="outlined" onClick={apply}>Apply</Button>
            </Stack>
          </> : <>
            { /* page if user chooses create option */ }
            <Stack direction="column" spacing={4}>
              <TextField label="Household Name" variant="outlined" onChange={e => setHouseholdName(e.target.value)} ></TextField>
              <Button variant="outlined" onClick={create}>Create</Button>
            </Stack>
          </>}
        </div> : null }
      </div>
    </Layout>
  )
}

import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';
import { useRouter } from 'next/router';
import ClientShield from '@/components/clientShield';
import { TextField, ToggleButton, ToggleButtonGroup, Button, Stack} from '@mui/material';
import { useState } from 'react';
import { Post } from '@/api';

export default function Onboarding() {
  const router = useRouter();
  ClientShield(router, false);

  const [applicationType, setApplicationType] = useState();
  const [householdId, setHouseholdId] = useState('');
  const [name, setName] = useState('');
  const [householdName, setHouseholdName] = useState('');

  const updateApplicationType = (newApplicationType: any) => {
    setApplicationType(newApplicationType);
  }

  // called when user clicks Apply button
  const apply = async () => {
    const res = await Post('/apply', { id: householdId, name: name });
    if (res.success) {
      router.push('/pending');
    } else {
      window.alert('There was an issue.');
    };
  }

  const create = async () => {
    const res = await Post('/newhousehold', { householdName: householdName, name: name });
    if (res.success) {
      router.push('/dashboard');
    } else {
      window.alert('There was an issue.');
    };
  }

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

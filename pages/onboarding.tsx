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

  const updateApplicationType = (newApplicationType: any) => {
    setApplicationType(newApplicationType);
  }

  const apply = async () => {
    await Post('/apply', householdId);
    router.push('/pending');
  }

  return (
    <Layout title="Sign Up">
      <div className={classes.content}>
        <h2 className={classes.headTag}>Onboarding</h2>
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
          </>}
        </div> : null }
      </div>
    </Layout>
  )
}

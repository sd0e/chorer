import Layout from '@/components/layout';
import classes from '@/styles/Auth.module.css';
import { useRouter } from 'next/router';
import { Button, TextField, Stack } from '@mui/material';

export default function Auth() {
  const router = useRouter();

  return (
    <Layout title="Continue to Chorer">
      <div className={classes.content}>
        <div className={classes.inner}>
          <h1>Continue to Chorer</h1>
          <TextField placeholder="Email" variant="outlined" type="email" />
          <TextField placeholder="Password" variant="outlined" type="password" />
          <Stack direction="row" spacing={4}>
            <Button variant="outlined" color="primary">Sign In</Button>
            <Button variant="outlined" color="secondary">Sign Up</Button>
          </Stack>
        </div>
      </div>
    </Layout>
  )
}
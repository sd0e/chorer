import Layout from '@/components/layout';
import classes from '@/styles/Auth.module.css';
import { useRouter } from 'next/router';
import { Button, TextField, Stack } from '@mui/material';
import gradient from '../assets/gradient.jpg';
import Image from 'next/image';

export default function Auth() {
  const router = useRouter();

  return (
    <Layout title="Continue to Chorer">
      <div className={classes.content}>
        <Image src={gradient} alt="A gradient background image" className={classes.background} />
        <div className={classes.inner}>
          <Stack direction="column" spacing={8}>
            <h1>Continue to Chorer</h1>
            <div>
              <TextField placeholder="Email" variant="outlined" type="email" />
              <TextField placeholder="Password" variant="outlined" type="password" />
            </div>
            <Stack direction="row" spacing={4}>
              <Button variant="outlined" color="primary">Sign In</Button>
              <Button variant="outlined" color="secondary">Sign Up</Button>
            </Stack>
          </Stack>
        </div>
      </div>
    </Layout>
  )
}

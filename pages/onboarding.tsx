import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';

export default function Onboarding() {
  const router = useRouter();
  const auth = getAuth();

  return (
    <Layout title="Sign Up">
      <div className={classes.content}>
        Onboarding
      </div>
    </Layout>
  )
}

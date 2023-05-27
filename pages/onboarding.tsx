import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';
import { useRouter } from 'next/router';

export default function Onboarding() {
  const router = useRouter();

  return (
    <Layout title="Sign Up">
      <div className={classes.content}>
        Onboarding
      </div>
    </Layout>
  )
}

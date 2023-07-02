// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  ClientShield(router);
  
  return (
    <Layout title="Dashboard" leftMenu>
      <div className={classes.content}>
        Dashboard
      </div>
    </Layout>
  )
}

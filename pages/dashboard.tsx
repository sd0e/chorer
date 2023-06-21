// import necessary libraries

import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';

export default function Dashboard() {
  return (
    <Layout title="Dashboard" leftMenu>
      <div className={classes.content}>
        Dashboard
      </div>
    </Layout>
  )
}

import Layout from '@/components/layout';
import classes from '@/styles/Onboarding.module.css';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <Layout title="Dashboard">
      <div className={classes.content}>
        Dashboard
      </div>
    </Layout>
  )
}

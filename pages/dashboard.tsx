// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  ClientShield(router);
  
  return (
    <Layout title="Dashboard" leftMenu>
      <div className={styles.content}>
        Dashboard
      </div>
    </Layout>
  )
}

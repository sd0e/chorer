// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';

// returns the page component to be served over relevant route
export default function Settings() {
  const router = useRouter();
  ClientShield(router);
  
  return (
    <Layout title="Settings" leftMenu>
      <div className={styles.content}>
        Settings
      </div>
    </Layout>
  )
}

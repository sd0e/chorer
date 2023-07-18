// import necessary libraries

import ChoreManager from '@/components/choreManager';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';

// returns the page component to be served over relevant route
export default function NewChore() {
  const router = useRouter();
  ClientShield(router);
  
  return (
    <Layout title="New Chore" leftMenu>
      <div className={styles.content}>
        <ChoreManager />
      </div>
    </Layout>
  )
}

// import necessary libraries

import ChoreManager from '@/components/choreManager';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import hasPrivileges from '@/scripts/hasPrivileges';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';

// returns the page component to be served over relevant route
export default function NewChore() {
  const router = useRouter();
  ClientShield(router);

  const userHasPrivileges = hasPrivileges();
  
  return (
    <Layout title="New Chore" leftMenu>
      {userHasPrivileges ? <div className={styles.content}>
        <ChoreManager isNew={true} />
      </div> : <span>You do not have sufficient privileges to access this page.</span>}
    </Layout>
  )
}

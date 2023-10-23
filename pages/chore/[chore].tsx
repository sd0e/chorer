// import necessary libraries

import { Get } from '@/api';
import ChoreManager from '@/components/choreManager';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// returns the page component to be served over relevant route
export default function Chore() {
  const router = useRouter();
  ClientShield(router);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (router.query.chore) Get(`/chore/${router.query.chore}`);
  }, [router.query]);
  
  return (
    <Layout title="Chore">
      <div className={styles.content}>
        {/* <ChoreManager isNew={false} /> */}
      </div>
    </Layout>
  )
}

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
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    setLoaded(false);
    if (router.query.chore) Get(`/chore/${router.query.chore}`).then((data: any) => {
      setData(data.response);
      setLoaded(true);
    });
  }, [router.query]);

  // conform type conforms to that required by chore manager
  const choreId = typeof router.query.chore === 'object' ? router.query.chore[0] : router.query.chore;
  
  return (
    <Layout title="Chore" leftMenu>
      <div className={styles.content}>
        { loaded ? (data ? <ChoreManager isNew={false} info={data} id={choreId} /> : <span>This chore does not exist.</span>) : <span>Loading...</span> }
      </div>
    </Layout>
  )
}

// import necessary libraries

import { Get } from '@/api';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// returns the page component to be served over relevant route
export default function Users() {
  const router = useRouter();
  ClientShield(router);

  const [users, setUsers] = useState<any>('Loading');

  useEffect(() => {
    ClientShield(router).then(() => {
      // code executes once it has been confirmed that user is signed in
      Get('/members').then(res => {
        console.log(res);
        if (res.success) setUsers(res.response);
        console.log(users);
      })
    });
  }, []);
  
  return (
    <Layout title="Users" leftMenu>
      <div className={styles.content}>
        { users === 'Loading' ? <span>Loading</span> : users[0].name }
      </div>
    </Layout>
  )
}

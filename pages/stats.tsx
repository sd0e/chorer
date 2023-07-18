// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import StatsDisplay from '@/components/ui/statsDisplay';

// returns the page component to be served over relevant route
export default function Statistics() {
  // ensures page is only served when authenticated
  const router = useRouter();
  ClientShield(router);
  
  return (
    <Layout title="Statistics" leftMenu>
      <div className={styles.content}>
        <Stack direction="column" spacing={4}>
          <StatsDisplay Title="Currently" Stats={[{ name: "Hi There With Some Long Text!", amount: 5 }, { name: "World", amount: 63 }]} />
          <StatsDisplay Title="Your Overall Statistics" Stats={[{ name: "Hi", amount: 5 }, { name: "World", amount: 63 }]} />
        </Stack>
      </div>
    </Layout>
  )
}

// import necessary libraries

import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import ActionButton, { ActionButtonColors } from '@/components/ui/actionButton';
import signOutUser from '@/firebase/signOutUser';
import styles from '@/styles/CommonPage.module.css';
import { LogoutOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';

// returns the page component to be served over relevant route
export default function Settings() {
  const router = useRouter();
  ClientShield(router);
  
  return (
    <Layout title="Settings" leftMenu>
      <div className={styles.content}>
        <ActionButton color={ActionButtonColors.Warning} Icon={LogoutOutlined} onClick={() => signOutUser()}>Sign Out</ActionButton>
      </div>
    </Layout>
  )
}

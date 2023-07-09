/* eslint-disable @next/next/no-img-element */
// import necessary libraries

import { Get, Post } from '@/api';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import userStyles from '@/styles/Users.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import admin from '@/assets/SVG/admin.svg';
import owner from '@/assets/SVG/owner.svg';
import { Stack } from '@mui/material';
import hasPrivileges from '@/scripts/hasPrivileges';
import ActionButton, { ActionButtonColors } from '@/components/ui/actionButton';
import { AdminPanelSettingsOutlined, CancelOutlined, CheckCircleOutlined, GavelOutlined } from '@mui/icons-material';
import getSessionFeature, { Feature } from '@/scripts/getSessionFeature';

// returns the page component to be served over relevant route
export default function Users() {
  const router = useRouter();
  ClientShield(router);

  const hasPrivs = hasPrivileges();

  // loads the information on users from the server
  const [users, setUsers] = useState<any>('Loading');

  useEffect(() => {
    ClientShield(router).then(() => {
      // code executes once it has been confirmed that user is signed in
      Get('/members').then(res => {
        if (res.success) setUsers(res.response);
      })
    });
  }, []);

  const ban = (uid: string) => {
    Post('/ban', { uid: uid }).then(() => window.location.reload());
  }

  const approve = (uid: string) => {
    Post('/approve', { uid: uid }).then(() => window.location.reload());
  }

  const reject = (uid: string) => {
    Post('/reject', { uid: uid }).then(() => window.location.reload());
  }

  const promote = (uid: string) => {
    Post('/promote', { uid: uid }).then(() => window.location.reload());
  }
  
  return (
    <Layout title="Users" leftMenu>
      <div className={styles.content}>
        <span>Invite users using the following ID: {getSessionFeature(Feature.AppliedHousehold)}</span>
        <Stack direction="column" spacing={2}>
          { /* if the information is still loading from the server, render a loading message */ }
          {users === 'Loading' ? <span>Loading</span> : users.map((user: any) => {
            // defines whether image appearing in user infoormation is saying that the user is an owner (takes precedence) or admin
            let pillImage = null;

            if (user.isOwner) pillImage = owner
            else if (user.isAdmin) pillImage = admin;
            return <div className={userStyles.userOuter} key={user.name}>
              <div>
                <div className={userStyles.userTitle}>
                  <span className={userStyles.userName}>{ user.name }</span>
                  { pillImage ? <img src={pillImage.src} alt={user.isOwner ? 'Owner' : 'Admin'} className={userStyles.userAuthority} /> : null }
                </div>
                <span className={userStyles.userEmail}>{user.email}</span>
              </div>
              { /* only renders user buttons if the signed-in user is an admin or owner, and the user being rendered is not the owner of the household */ }
              { hasPrivs && !user.isOwner ? <Stack direction="row" spacing={4}>
                { user.status === 'accepted' ? <>
                  <ActionButton Icon={GavelOutlined} onClick={() => ban(user._id)} color={ActionButtonColors.Error}>Ban</ActionButton>
                  {!user.isAdmin && <ActionButton Icon={AdminPanelSettingsOutlined} onClick={() => promote(user._id)} color={ActionButtonColors.Success}>Promote</ActionButton>}
                </> : <>
                  <ActionButton Icon={CheckCircleOutlined} onClick={() => approve(user._id)} color={ActionButtonColors.Success}>Approve</ActionButton>
                  <ActionButton Icon={CancelOutlined} onClick={() => reject(user._id)} color={ActionButtonColors.Error}>Reject</ActionButton>
                </> }
              </Stack> : null }
            </div>
          }) }
        </Stack>
      </div>
    </Layout>
  )
}

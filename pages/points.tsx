// import necessary libraries

import { Get, Post } from '@/api';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import hasPrivileges from '@/scripts/hasPrivileges';
import styles from '@/styles/CommonPage.module.css';
import pointStyles from '@/styles/Points.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';
import ActionButton, { ActionButtonColors } from '@/components/ui/actionButton';
import { RemoveCircleOutlineOutlined } from '@mui/icons-material';

// returns the page component to be served over relevant route
export default function Points() {
  const router = useRouter();
  ClientShield(router);

  const hasPrivs = hasPrivileges();
  const [data, setData] = useState<any>(null);
  const [currUser, setCurrUser] = useState<null | string>(null);

  useEffect(() => {
    ClientShield(router).then(() => {
      // code executes once it has been confirmed that user is signed in
      if (hasPrivs) {
        // if user has admin get points for all users
        Get('/allpoints').then(res => {
          if (res.success) {
            setCurrUser(res.response[0].userId);
            setData(res.response);
          }
        })
      } else {
        // otherwise get user-specific points
        Get('/points').then(res => {
          if (res.success) setData(res.response);
        })
      }
    });
  }, []);

  const deduct = () => {
    const userId = currUser;
    const userBalance = data.find((val: any) => val.userId === currUser).balance;
    const pointsToDeduct = Number(window.prompt('Enter number of points to deduct'));
    if (!pointsToDeduct) {
      window.alert('Transaction cancelled');
      return;
    } 
    const newBalance = userBalance - pointsToDeduct;
    if (newBalance < 0) {
      window.alert('Too many points deducted');
    } else {
      Post('/deduct', { points: pointsToDeduct, uid: userId }).then(() => window.location.reload());
    }
  }
  
  return (
    <Layout title="Points" leftMenu>
      <div className={styles.content}>
        {!data ? 'Loading' : <div className={pointStyles.points}>
          {hasPrivs ? <>
            <Select value={currUser} label="User" onChange={e => setCurrUser(e.target.value)}>
              {data.map((u: any) => <MenuItem value={u.userId} key={u.userId}>{ u.name }</MenuItem>)}
            </Select>
            <p className={pointStyles.numberPoints}>{data.find((val: any) => val.userId === currUser).balance}</p>
            <ActionButton color={ActionButtonColors.Error} Icon={RemoveCircleOutlineOutlined} onClick={deduct}>Deduct</ActionButton>
            </>
            : <>
              <span className={pointStyles.pointTitle}>Balance</span>
              <p className={pointStyles.numberPoints}>{data.balance}</p>
            </> }
        </div>}
      </div>
    </Layout>
  )
}

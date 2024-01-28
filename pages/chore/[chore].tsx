/* eslint-disable @next/next/no-img-element */
// import necessary libraries

import { Get, Post } from '@/api';
import ChoreManager from '@/components/choreManager';
import ClientShield from '@/components/clientShield';
import Layout from '@/components/layout';
import styles from '@/styles/CommonPage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Dialog, Grid, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { utcToRelative } from 'utctorelative';
import { Edit, UploadFileOutlined } from '@mui/icons-material';
import hasPrivileges from '@/scripts/hasPrivileges';
import { InterClass } from '@/font';
import { getAuth } from 'firebase/auth';

// returns the page component to be served over relevant route
export default function Chore() {
  const router = useRouter();
  ClientShield(router);

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<any | null>(null);

  function fetchChore() {
    setLoaded(false);
    Get(`/chore/${router.query.chore}`).then((data: any) => {
      setData(data.response);
      if (data.response && data.response.proofFile) setUploadedProof(data.response.proofFile);
      if (data.response) setCheckboxSelected(data.response.isSubmitted);
      setLoaded(true);
    });
  }

  // load chore data upon page load from URL
  useEffect(() => {
    if (router.query.chore) fetchChore();
  }, [router.query]);

  // conform type conforms to that required by chore manager
  const choreId = typeof router.query.chore === 'object' ? router.query.chore[0] : router.query.chore;

  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [tempDisabled, setTempDisabled] = useState(false);

  // allow chore to be submitted by selecting checkbox
  const handleCheckbox = (newValue: boolean) => {
    setCheckboxSelected(newValue);
    setTempDisabled(true);

    Post('/submitchore', {
      value: newValue,
      id: choreId
    }).then(() => {
      setTempDisabled(false);
    })
  }

  // keeps track on whether the user has uploaded proof
  const [uploadedProof, setUploadedProof] = useState<null | string>(null);
  const [proofDialogOpen, setProofDialogOpen] = useState(false);
  const [tempProof, setTempProof] = useState('');

  // calls the API to update proof upon button click
  const changeProof = () => {
    if (uploadedProof) {
      setUploadedProof(null);
      Post('/updateproof', {
        proof: null,
        id: choreId
      })
    } else {
      if (tempProof.startsWith('https://')) {
        setProofDialogOpen(false);
        setUploadedProof(tempProof);
        Post('/updateproof', {
          proof: tempProof,
          id: choreId
        });
      } else {
        window.alert('The proof URL must be a full URL of an image on the Internet.');
      }
    }
  }

  const [managerDialogOpen, setManagerDialogOpen] = useState(false);

  // if the user has admin privileges, allow them to edit the chore details
  const userHasPrivileges = hasPrivileges();

  // get user's uid to prevent people who are not currently assigned from submitting the chore
  const auth = getAuth();
  const user = auth.currentUser;
  const currentUserId = user?.uid;

  return (
    <Layout title="Chore" leftMenu>
      <div className={styles.content}>
        <Dialog open={proofDialogOpen} onClose={() => setProofDialogOpen(false)} sx={{ fontFamily: 'inherit' }}>
          <div className={InterClass}>
            <Stack direction="column" spacing={4} sx={{ padding: 2 }}>
              <TextField fullWidth value={tempProof} onChange={e => setTempProof(e.target.value)} label="Image URL" />
              <Button variant="outlined" onClick={changeProof}>Add Proof</Button>
            </Stack>
          </div>
        </Dialog>
        <Dialog open={managerDialogOpen} onClose={() => setManagerDialogOpen(false)}>
          { loaded && data ? <div style={{ padding: 32 }}>
            <ChoreManager isNew={false} info={data} id={choreId} onSave={() => { setManagerDialogOpen(false); setTimeout(() => fetchChore(), 200) }} />
          </div> : null }
        </Dialog>
        { loaded ? (data ? <Grid container spacing={4} justifyItems="center" sx={{ maxWidth: '800px' }}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox checked={checkboxSelected} onChange={e => handleCheckbox(e.target.checked)} disabled={tempDisabled || currentUserId !== data.currentAssignee} />
              <h4>{data.name}</h4>
              { userHasPrivileges ? <IconButton onClick={() => setManagerDialogOpen(true)}>
                <Edit />
              </IconButton> : null }
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <span>Due {utcToRelative(data.dueTime)}</span>
          </Grid>
          <Grid item xs={12} md={6}>
            <span>Repeats every {data.repeatFrequency / 86400000} day{data.repeatFrequency / 86400000 === 1 ? '' : 's'}</span>
          </Grid>
          <Grid item xs={12}>
            <span style={{ color: "#beb455" }}>{data.rewardPoints} points on completion</span>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" sx={{ width: '192px', height: '144px' }} disabled={currentUserId !== data.currentAssignee} onClick={() => {
              if (uploadedProof) changeProof()
              else setProofDialogOpen(true);
            }}>
              { uploadedProof === null ? <Tooltip title="Upload a proof file">
                <div>
                  <UploadFileOutlined />
                </div>
              </Tooltip> : <img src={uploadedProof} alt="Uploaded image proof" style={{ objectFit: 'contain', width: '100%', 
              height: '100%' }} /> }
            </Button>
          </Grid>
          <Grid item xs={12}>
            { currentUserId !== data.currentAssignee ? <span style={{ opacity: 0.4 }}>You have little access to this chore as you are not currently assigned.</span> : null }
          </Grid>
        </Grid> : <span>This chore does not exist. It may be that the chore has completed all of its defined repeat cycles; in this case, you may wish to create a new chore.</span>) : <span>Loading...</span> }
      </div>
    </Layout>
  )
}

// used in both the new chore and chore management pages to create and edit chores

// import necessary libraries
import { createTheme, Stack, TextField, ThemeProvider, Backdrop, Paper, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './choreManager.module.css';
import ActionButton, { ActionButtonColors } from './ui/actionButton';
import { AddOutlined, DoneOutline } from '@mui/icons-material';
import { Get } from '@/api';

export type hex = `#${string}`;

// export the component to be used in other files
export default function ChoreManager({ info }: { info?: { name: string, color: hex, userList: object } | undefined }) {
	// define component hooks to temporarily store data
	const [name, setName] = useState<string>(info ? info.name : '');
	const [color, setColor] = useState<hex>(info ? info.color : '#000000');
	const [userList, setUserList] = useState<string | null>(info ? JSON.stringify(info.userList) : null);

	const newColor = (color: any) => {
		setColor(color);
	}

	// initialise a Material UI theme to use the Inter font (used throughout the project)
	const theme = createTheme({
		palette: {
			mode: 'light',
		},
		typography: {
			fontFamily: [
				'"Inter"',
				'sans-serif'
			].join(',')
		}
	});

	const [userPopupShowing, setUserPopupShowing] = useState(false);
	const [currUser, setCurrUser] = useState<any>(null);
	const [data, setData] = useState<any>(null);

	const showNewUserPopup = () => {
		setUserPopupShowing(true);
	}

	useEffect(() => {
		Get(`/fullmembers`).then(newData => {
			setData(newData.response);
		})
	}, []);

	const addUser = () => {
		const userId = currUser;
	}

	return <ThemeProvider theme={theme}>
		<Backdrop
			open={userPopupShowing}
			onClick={() => setUserPopupShowing(false)}
			sx={{ zIndex: 1, color: 'white' }}
		>
			<Paper sx={{ backgroundColor: '#ffffff', padding: '32px' }}>
				{ data ? <Select value={currUser} label="User" onChange={e => setCurrUser(e.target.value)}>
					{data.map((u: any) => <MenuItem value={u._id} key={u._id}>{ u.name }</MenuItem>)}
				</Select> : null }
				<ActionButton color={ActionButtonColors.Success} Icon={DoneOutline} onClick={addUser}>Add</ActionButton>
			</Paper>
		</Backdrop>
		<Stack direction="column" spacing={4}>
			<Stack direction="row" spacing={2}>
				<TextField value={name} onChange={e => setName(e.target.value)} inputProps={{ style: { fontWeight: 600 } }} label="Chore Name" className={styles.choreName} />
				<input type="color" className={styles.colorInput} value={color} onChange={e => newColor(e.target.value)} />
			</Stack>
			<div>
				<h3>Assignees</h3>
				<ActionButton Icon={AddOutlined} color={ActionButtonColors.Success} onClick={showNewUserPopup}>New</ActionButton>
			</div>
		</Stack>
	</ThemeProvider>
}
// used in both the new chore and chore management pages to create and edit chores

// import necessary libraries
import { createTheme, Stack, TextField, ThemeProvider, Backdrop, Paper, Select, MenuItem, ListItem, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './choreManager.module.css';
import ActionButton, { ActionButtonColors } from './ui/actionButton';
import { AddOutlined, CancelOutlined, Done } from '@mui/icons-material';
import { Get } from '@/api';
import CommonPaper from './ui/commonPaper';

export type hex = `#${string}`;

// export the component to be used in other files
export default function ChoreManager({ info }: { info?:
	{
		name: string,
		color: hex,
		userList: object,
		repeatTimes: number,
		repeatFrequency: number,
		notificationTimeBeforeOverdue: number,
		completeAction: string,
		rewardPoints: number,
		overdueDailyRewardDecrease: number
	}
| undefined }) {
	// define component hooks to temporarily store data
	const [thisInfo, setThisInfo] = useState<string>(() => {
		let tempInfo = info ? info : {
			name: '',
			color: '#000000',
			userList: [],
			repeatTimes: 1,
			repeatFrequency: 604800000,
			notificationTimeBeforeOverdue: 2,
			completeAction: '',
			rewardPoints: 200,
			overdueDailyRewardDecrease: 50
		};

		return JSON.stringify(tempInfo);
	});

	const getProp = (propName: string) => JSON.parse(thisInfo)[propName];

	const updateProp = (propName: string, newValue: any) => {
		setThisInfo(thisInfo => {
			let tempInfo = JSON.parse(thisInfo);
			tempInfo[propName] = newValue;
			return JSON.stringify(tempInfo);
		});
	}

	const newColor = (color: any) => {
		updateProp('color', color);
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

	// get members list and populate array
	useEffect(() => {
		Get(`/fullmembers`).then(newData => {
			setData(newData.response);
		})
	}, []);

	// adds a user from the popup to the array of existing users
	const addUser = () => {
		const userId = currUser;

		let tempUserList = JSON.parse(thisInfo)["userList"];
		
		data.forEach((userInfo: any) => {
			console.log(userId, userInfo._id);
			if (userId === userInfo._id) {
				let tempUser = userInfo;
				tempUser["numPerCycle"] = 1;
				tempUserList.push(tempUser);
			}
		});

		updateProp('userList', tempUserList);

		setUserPopupShowing(false);
	}

	return <ThemeProvider theme={theme}>
		<Backdrop
			open={userPopupShowing}
			sx={{ zIndex: 1, color: 'white' }}
		>
			<Paper sx={{ backgroundColor: '#ffffff', padding: '32px' }}>
				<Stack direction="column" spacing={4}>
					{ data ? <Select value={currUser} label="User" onChange={e => setCurrUser(e.target.value)}>
						{data.map((u: any) => <MenuItem value={u._id} key={u._id}>{ u.name }</MenuItem>)}
					</Select> : null }
					<ActionButton color={ActionButtonColors.Success} Icon={Done} onClick={addUser}>Add</ActionButton>
					<ActionButton color={ActionButtonColors.Error} Icon={CancelOutlined} onClick={() => setUserPopupShowing(false)}>Cancel</ActionButton>
				</Stack>
			</Paper>
		</Backdrop>
		<Stack direction="column" spacing={4}>
			<Stack direction="row" spacing={2}>
				<TextField value={JSON.parse(thisInfo)["name"]} onChange={e => updateProp('name', e.target.value)} inputProps={{ style: { fontWeight: 600 } }} label="Chore Name" className={styles.choreName} />
				<input type="color" className={styles.colorInput} value={JSON.parse(thisInfo)["color"]} onChange={e => newColor(e.target.value)} />
			</Stack>
			<div>
				<Stack direction="column" spacing={4} alignItems="flex-start" sx={{ width: '100%' }}>
					<div>
						<h3>Assignees</h3>
						<ActionButton Icon={AddOutlined} color={ActionButtonColors.Success} onClick={showNewUserPopup}>New</ActionButton>
					</div>
					{ JSON.parse(thisInfo)["userList"].length !== 0 ? <Stack direction="column" spacing={2} sx={{ width: '100%' }}>{JSON.parse(thisInfo)["userList"].map((user: any, idx: number) => {
						return <CommonPaper key={idx}>
							<Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
								<Stack direction="row" spacing={2} alignItems="center">
									<span><strong>{user.name}</strong> has this chore for </span>
									<TextField value={user.numPerCycle} onChange={e => {
										let tempUserList = JSON.parse(thisInfo)["userList"];
										const theNumber = parseInt(e.target.value);
										if (e.target.value === '') {
											tempUserList[idx].numPerCycle = 0;
										} else if (!Number.isNaN(theNumber)) {
											tempUserList[idx].numPerCycle = Math.abs(theNumber);
										} else {
											window.alert('The value must be a number.')
										}
										updateProp('userList', tempUserList);
									}} sx={{ width: '64px' }} />
									<span>time{user.numPerCycle === 1 ? `` : `s`} per cycle</span>
								</Stack>
								<div>
									<IconButton color="error" onClick={e => {
										let tempUserList = JSON.parse(thisInfo)["userList"];
										tempUserList.splice(idx, 1);
										updateProp('userList', tempUserList);
									}}>
										<CancelOutlined />
									</IconButton>
								</div>
							</Stack>
						</CommonPaper>
					})}</Stack> : null }
				</Stack>
			</div>
		</Stack>
	</ThemeProvider>
}
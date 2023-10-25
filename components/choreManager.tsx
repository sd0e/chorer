// used in both the new chore and chore management pages to create and edit chores

// import necessary libraries
import { createTheme, Stack, TextField, ThemeProvider, Backdrop, Paper, Select, MenuItem, ListItem, IconButton, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './choreManager.module.css';
import ActionButton, { ActionButtonColors } from './ui/actionButton';
import { AddOutlined, CancelOutlined, Done } from '@mui/icons-material';
import { Get, Post } from '@/api';
import CommonPaper from './ui/commonPaper';
import { useRouter } from 'next/router';
import { InterClass } from '@/font';

export type hex = `#${string}`;

// export the component to be used in other files
export default function ChoreManager({ info, isNew, id, onSave }: { info?:
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
	},
	isNew: boolean,
	id?: string,
	onSave?: () => void
| undefined }) {
	const router = useRouter();

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

	// code to fetch a property from the store
	const getProp = (propName: string) => JSON.parse(thisInfo)[propName];

	// code to set a property in the store
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
			setCurrUser(newData.response[0]._id);
		})
	}, []);

	// adds a user from the popup to the array of existing users
	const addUser = () => {
		const userId = currUser;

		let tempUserList = JSON.parse(thisInfo)["userList"];
		
		data.forEach((userInfo: any) => {
			if (userId === userInfo._id) {
				let tempUser = userInfo;
				tempUser["numPerCycle"] = 1;
				tempUser["_id"] = userId;
				tempUserList.push(tempUser);
			}
		});

		updateProp('userList', tempUserList);

		setUserPopupShowing(false);
	}

	const textFields = [
		{
			"title": "Number of times to repeat",
			"propKey": "repeatTimes",
			"onChange": (e: any) => updateProp("repeatTimes", e.target.value),
			"type": "number"
		},
		{
			"title": "How many days between each repeat",
			"propKey": "repeatFrequency",
			"onChange": (e: any) => updateProp("repeatFrequency", e.target.value * 86400000),
			"type": "number"
		},
		{
			"title": "Hours before due time to send reminder",
			"propKey": "notificationTimeBeforeOverdue",
			"onChange": (e: any) => updateProp("notificationTimeBeforeOverdue", e.target.value),
			"type": "number"
		},
		{
			"title": "Complete webhook URL",
			"propKey": "completeAction",
			"onChange": (e: any) => updateProp("completeAction", e.target.value),
			"type": "text"
		},
		{
			"title": "Reward points",
			"propKey": "rewardPoints",
			"onChange": (e: any) => updateProp("rewardPoints", e.target.value),
			"type": "number"
		},
		{
			"title": "Daily overdue reward point decrease",
			"propKey": "overdueDailyRewardDecrease",
			"onChange": (e: any) => updateProp("overdueDailyRewardDecrease", e.target.value),
			"type": "number"
		}
	]

	const save = () => {
		const info: {
			name: string,
			color: hex,
			userList: object,
			repeatTimes: number,
			repeatFrequency: number,
			notificationTimeBeforeOverdue: number,
			completeAction: string,
			rewardPoints: number,
			overdueDailyRewardDecrease: number
		} = JSON.parse(thisInfo);
		if (info.repeatTimes < 1 || info.repeatFrequency < 86400000 || info.notificationTimeBeforeOverdue < 1 || info.notificationTimeBeforeOverdue < 1 || info.rewardPoints < 0 || info.overdueDailyRewardDecrease < 0) {
			window.alert('Values must be positive integers.');
		} else if (info.name === "") {
			window.alert('The chore must have a name.');
		} else if ((info.userList as any).length === 0) {
			window.alert('There must be users allocated to the chore.');
		} else {
			// can be submitted
			if (isNew) {
				Post('/newchore', { info: info }).then(() => {
					if (onSave) {
						onSave();
					} else {
						router.push('/admin');
					}
				});
			} else {
				Post('/updatechore', { info: info, id: id }).then(() => {
					if (onSave) {
						onSave();
					} else {
						router.push('/admin');
					}
				});
			}
		}
	}

	return <div className={InterClass}>
		<ThemeProvider theme={theme}>
			<Backdrop
				open={userPopupShowing}
				sx={{ zIndex: 1, color: 'white' }}
			>
				{ data ? <Paper sx={{ backgroundColor: '#ffffff', padding: '32px' }}>
					<Stack direction="column" spacing={4}>
						{ data ? <Select value={currUser} label="User" onChange={e => setCurrUser(e.target.value)}>
							{data.map((u: any) => <MenuItem value={u._id} key={u._id}>{ u.name }</MenuItem>)}
						</Select> : null }
						<ActionButton color={ActionButtonColors.Success} Icon={Done} onClick={addUser}>Add</ActionButton>
						<ActionButton color={ActionButtonColors.Error} Icon={CancelOutlined} onClick={() => setUserPopupShowing(false)}>Cancel</ActionButton>
					</Stack>
				</Paper> : null }
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
						<Grid container width="100%">
							{textFields.map(textField => {
								return <Grid item xs={12} key={textField.title}>
									<Grid container width="100%" sx={{ marginBottom: '0.5rem' }}>
										<Grid item xs={6}>
											<span>{textField.title}</span>
										</Grid>
										<Grid item xs={6}>
											<TextField type={textField.type} value={textField.propKey === "repeatFrequency" ? JSON.parse(thisInfo)[textField.propKey] / 86400000 : JSON.parse(thisInfo)[textField.propKey]} onChange={e => textField.onChange(e)} fullWidth />
										</Grid>
									</Grid>
								</Grid>
							})}
						</Grid>
					</Stack>
				</div>
				<Button color="primary" variant="outlined" sx={{ width: 'min-content' }} onClick={save}>Save</Button>
			</Stack>
		</ThemeProvider>
	</div>
}
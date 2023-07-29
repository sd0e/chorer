// used in both the new chore and chore management pages to create and edit chores

// import necessary libraries
import { createTheme, Stack, TextField, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import styles from './choreManager.module.css';

export type hex = `#${string}`;

// export the component to be used in other files
export default function ChoreManager({ info }: { info?: { name: string, color: hex } | undefined }) {
	// define component hooks to temporarily store data
	const [name, setName] = useState<string>(info ? info.name : '');
	const [color, setColor] = useState<hex>(info ? info.color : '#000000');

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

	return <ThemeProvider theme={theme}>
		<Stack direction="column" spacing={4}>
			<Stack direction="row" spacing={2}>
				<TextField value={name} onChange={e => setName(e.target.value)} inputProps={{ style: { fontWeight: 600 } }} label="Chore Name" className={styles.choreName} />
				<input type="color" className={styles.colorInput} value={color} onChange={e => newColor(e.target.value)} />
			</Stack>
			users
			submit buttons
		</Stack>
	</ThemeProvider>
}
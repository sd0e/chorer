// import necessary libraries
import { SvgIconComponent } from "@mui/icons-material";
import { createTheme, ThemeProvider, Button } from '@mui/material';
import styles from './actionButton.module.css';
import { InterClass } from "@/font";

// export possible colors for the button
export enum ActionButtonColors {
	Error = "error",
	Success =  "success",
	Warning = "warning"
}

// return the component containing the button
export default function ActionButton({ Icon, onClick, children, color }: { Icon: SvgIconComponent, onClick: () => void, children: string, color: ActionButtonColors }) {
	// define a theme which removes default styling from the button
	const theme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						background: 'none'
					}
				}
			}
		}
	});

	return <ThemeProvider theme={theme}>
		<Button onClick={onClick} color={color}>
			<div className={styles.buttonInner}>
				<Icon fontSize="small" />
				<span className={[styles.buttonText, InterClass].join(' ')}>{ children }</span>
			</div>
		</Button>
	</ThemeProvider>
}
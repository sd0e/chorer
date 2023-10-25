import { Checkbox, IconButton, Stack } from '@mui/material';

import styles from './individualChore.module.css';
import { Visibility } from '@mui/icons-material';

export default function IndividualChore({ title, due, overdue, onClick, isPersonal, onSubmit } : { title: string, due: string, overdue: boolean, onClick: () => void, isPersonal: boolean, onSubmit?: () => void }) {
	return <div className={styles.chore} style={{ borderColor: overdue ? '#ff0000' : 'rgba(0, 0, 0, 0.15)' }}>
		<Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center">
			<Stack direction="row" spacing={2} alignItems="center">
				{ isPersonal ? <Checkbox checked={false} onChange={onSubmit} /> : null }
				<Stack direction="column" spacing={1}>
					<span className={styles.name}>{title}</span>
					<span className={styles.timer}>{due}</span>
				</Stack>
			</Stack>
			<IconButton onClick={onClick}>
				<Visibility />
			</IconButton>
		</Stack>
	</div>
}
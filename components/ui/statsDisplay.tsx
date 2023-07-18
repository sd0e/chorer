import styles from './statsDisplay.module.css';
import { Stack } from '@mui/material';

export default function StatsDisplay({ Title, Stats }: { Title: string, Stats: { name: string, amount: number }[] }) {
	return <div className={styles.statDisplayOuter}>
		<span className={styles.title}>{Title}</span>
		<Stack direction="row" spacing={4}>
			{Stats.map(stat => {
				return <div className={styles.statOuter} key={stat.name}>
					<span className={styles.statAmount}>{ stat.amount }</span>
					<span className={styles.statName}>{ stat.name }</span>
				</div>
			})}
		</Stack>
	</div>
}
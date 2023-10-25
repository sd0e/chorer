// import type for declaration of material UI icons
import { SvgIconComponent } from '@mui/icons-material';
import styles from './menuItem.module.css';

// defines a single item which can be used throughout the program
export default function SingleMenuItem({ Title, Color, Icon } : { Title: string, Color: string, Icon: SvgIconComponent }) {
    return <div className={styles.menuItem}>
		<div className={styles.menuItemLeft}>
			<Icon className={styles.menuItemIcon} fontSize="medium" style={{ color: Color }} />
			<span className={styles.menuItemText}>{Title}</span>
		</div>
	</div>
}
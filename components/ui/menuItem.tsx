// import type for declaration of material UI icons
import { SvgIconComponent } from '@mui/icons-material';
import styles from './menuItem.module.css';
import Link from 'next/link';

// defines an item to be displayed in the left menu
export default function MenuItem({ Title, Route, Color, Icon, Selected } : { Title: string, Route: string, Color: string, Icon: SvgIconComponent, Selected: boolean }) {
    return <Link href={Route} className={styles.menuItemLink}>
        <div className={styles.menuItem}>
            <div className={styles.menuItemLeft}>
                <Icon className={styles.menuItemIcon} fontSize="medium" style={{ color: Color }} />
                <span className={styles.menuItemText}>{Title}</span>
            </div>
            <div>
                { Selected ? <div className={styles.menuItemSelected} style={{ backgroundColor: Color }}></div> : null }
            </div>
        </div>
    </Link>
}
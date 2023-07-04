// import components used within the left menu
import styles from './leftMenu.module.css';

// exports the component containing the left menu
export default function LeftMenu() {
    return <div className={styles.leftMenu}>
        <div>
            Chorer
            { /* content in here displayed at the top of the flex column */ }
        </div>
        <div>
            Yes
            { /* content in here displayed at the bottom of the flex column */ }
        </div>
    </div>
}
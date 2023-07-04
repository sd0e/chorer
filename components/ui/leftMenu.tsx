/* eslint-disable @next/next/no-img-element */
// import components used within the left menu
import styles from './leftMenu.module.css';
import logo from '@/assets/SVG/logo.svg';
import admin from '@/assets/SVG/admin.svg';
import owner from '@/assets/SVG/owner.svg';
import getSessionFeature, { Feature } from '@/scripts/getSessionFeature';

// exports the component containing the left menu
export default function LeftMenu() {
    const isAdmin = getSessionFeature(Feature.IsAdmin);
    const isOwner = getSessionFeature(Feature.IsOwner);

    // defines whether image appearing in menu is saying that the user is an owner (takes precedence) or admin
    let pillImage = null;

    if (isOwner) pillImage = owner
    else if (isAdmin) pillImage = admin;
    
    const name = getSessionFeature(Feature.Name);
    const email = getSessionFeature(Feature.Email);

    return <div className={styles.leftMenu}>
        <div>
            { /* content in here displayed at the top of the flex column */ }
            <img src={logo.src} className={styles.logo} alt="Chorer logo" />
        </div>
        <div>
            { /* content in here displayed at the bottom of the flex column */ }
            <div className={styles.leftMenuInfo}>
                <div className={styles.leftMenuInfoText}>
                    <span className={styles.leftMenuName}>{name}</span>
                    <span className={styles.leftMenuEmail}>{email}</span>
                </div>
                {/* Conditionally render pillImage, only if the user is an owner or admin (as defined earlier) */}
                {pillImage ? <img src={pillImage.src} alt="Pill Image" className={styles.leftMenuPill} /> : null}
            </div>
        </div>
    </div>
}
/* eslint-disable @next/next/no-img-element */
// import components used within the left menu
import styles from './leftMenu.module.css';
import logo from '@/assets/SVG/logo.svg';
import admin from '@/assets/SVG/admin.svg';
import owner from '@/assets/SVG/owner.svg';
import getSessionFeature, { Feature } from '@/scripts/getSessionFeature';
import { Stack } from '@mui/material';
import MenuItem from './menuItem';
import { AccountCircleOutlined, AddTaskOutlined, AdminPanelSettingsOutlined, AnalyticsOutlined, DashboardOutlined, SavingsOutlined, SettingsOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';

// exports the component containing the left menu
export default function LeftMenu() {
    // define the current page route so that it can display which page is selected on the left mneu
    const router = useRouter();
    const path = router.pathname;

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
            <Stack direction="column" spacing={1.5} alignItems="flex-start">
                <img src={logo.src} className={styles.logo} alt="Chorer logo" />
                <MenuItem
                    Title="Dashboard"
                    Route="/dashboard"
                    Color="#ffa449"
                    Icon={DashboardOutlined}
                    Selected={path === "/dashboard"}
                />
                <MenuItem
                    Title="Statistics"
                    Route="/stats"
                    Color="#ff24a1"
                    Icon={AnalyticsOutlined}
                    Selected={path === "/stats"}
                />
                <MenuItem
                    Title="Users"
                    Route="/users"
                    Color="#ff6e03"
                    Icon={AccountCircleOutlined}
                    Selected={path === "/users"}
                />
                <MenuItem
                    Title="New Chore"
                    Route="/newchore"
                    Color="#573962"
                    Icon={AddTaskOutlined}
                    Selected={path === "/newchore"}
                />
                <MenuItem
                    Title="Admin Console"
                    Route="/admin"
                    Color="#ff332a"
                    Icon={AdminPanelSettingsOutlined}
                    Selected={path === "/admin"}
                />
            </Stack>
        </div>
        <div>
            { /* content in here displayed at the bottom of the flex column */ }
            <Stack direction="column" spacing={1.5} alignItems="flex-start">
                <MenuItem
                    Title="Points"
                    Route="/points"
                    Color="#c3dc3a"
                    Icon={SavingsOutlined}
                    Selected={path === "/points"}
                />
                <MenuItem
                    Title="Settings"
                    Route="/settings"
                    Color="#0089ca"
                    Icon={SettingsOutlined}
                    Selected={path === "/settings"}
                />
                <div className={styles.leftMenuInfo}>
                    <div className={styles.leftMenuInfoText}>
                        <span className={styles.leftMenuName}>{name}</span>
                        <span className={styles.leftMenuEmail}>{email}</span>
                    </div>
                    {/* Conditionally render pillImage, only if the user is an owner or admin (as defined earlier) */}
                    {pillImage ? <img src={pillImage.src} alt="Pill Image" className={styles.leftMenuPill} /> : null}
                </div>
            </Stack>
        </div>
    </div>
}
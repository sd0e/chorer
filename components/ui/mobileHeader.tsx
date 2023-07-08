/* eslint-disable @next/next/no-img-element */

// import necessary libraries
import { MenuOutlined } from '@mui/icons-material';
import styles from './mobileHeader.module.css';
import { IconButton, Stack } from '@mui/material';
import logo from '@/assets/SVG/logo.svg';
import Link from 'next/link';

// export component, taking one prop, which is the function to be called when the "hamburger menu" button is clicked
export default function MobileHeader({ openMenu } : { openMenu: () => void }) {
	return (
		<div className={styles.mobileHeader}>
			<Stack direction="row" spacing={4} alignItems="center">
				<IconButton onClick={openMenu}><MenuOutlined fontSize="small" /></IconButton>
				<Link href="/dashboard" className={styles.logoLink}>
					<img src={logo.src} className={styles.logo} alt="Chorer logo" />
				</Link>
			</Stack>
		</div>
	)
}
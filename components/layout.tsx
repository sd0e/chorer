// imports relevant tutorials
import Head from 'next/head';
import styles from './layout.module.css';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { InterClass } from '@/font';
import LeftMenu from './ui/leftMenu';
import { SwipeableDrawer } from '@mui/material';
import MobileHeader from './ui/mobileHeader';

// defines site name and description, exported so they can be used throughout the programme
export const siteName = 'Chorer';
export const siteDescription = 'Chore Management System';

// set up notifications
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Layout({ children, title, leftMenu = false }: { children: React.ReactNode, title?: string, leftMenu?: boolean }) {
    // defines animation variants to use to make the page load more smoothly
    const variants = {
        hidden: { opacity: 0, x: 0, y: 400 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -400 },
    }

    const enterVariants = {
        hidden: { opacity: 0, x: 0, y: 20 },
        enter: { opacity: 1, x: 0, y: 0 },
    }

    // defines hook which updates when viewport width goes below certain level, to display menu
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
    const mobileResize = () => {
		const minWidth = 900;

		if (window.innerWidth >= minWidth && isMobile) setIsMobile(false);
		else if (window.innerWidth < minWidth && !isMobile) setIsMobile(true);
	}

    // register notification provider, attaching the user ID to registration
    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, user => {
            const userId = user?.uid;

            const beamsClient = new PusherPushNotifications.Client({
                instanceId: '1a4f7c42-a3f3-4b41-b6bb-f510ed9f34e2',
            });
            
            beamsClient.start()
                .then(() => beamsClient.addDeviceInterest(userId ? userId : 'unauthorised'))
                .catch(console.error);
        });
    }, []);

    window.addEventListener('resize', mobileResize, true);
    
    // hook which defines whether the left mobile menu is open
    const [menuOpen, setMenuOpen] = useState(false);

    // if displaying left menu, add flex styles to force menu to go on the left
    let classes = [ styles.wrapper, InterClass ];
    if (leftMenu && !isMobile) classes.push(styles.includesMenu);

    // return mobile-designed version of page if earlier hook states that it should render a mobile version
    if (isMobile) {
        return (
            <div
                className={classes.join(' ')}
            >
                { leftMenu ? <SwipeableDrawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)} onOpen={() => setMenuOpen(true)} PaperProps={{ sx: { width: '25rem', maxWidth: '100%' } }}>
                    <LeftMenu />
                </SwipeableDrawer> : null }
                <div className={leftMenu ? styles.centralContainerLeftMenuMobile : styles.centralContainer}>
                    { /* framer motion component which uses animation when it enters */}
                    <MobileHeader openMenu={() => setMenuOpen(true)} />
                    <motion.div
                        className={leftMenu ? styles.containerInnerWithMenuMobile : styles.containerInner}
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{ type: 'ease-in-out', duration: 0.25 }}
                    >
                        <Head>
                            {/* Defines page head */}
                            <title>{title ? `${title} - ${siteName}` : siteName}</title>
                            <link rel="icon" href="/favicon.ico" />
                            <meta name="description" content={siteDescription} />
                            <meta name="og:title" content={siteName} />
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <motion.main
                            style={{ height: '100%' }}
                            variants={enterVariants}
                            initial="hidden"
                            animate="enter"
                            transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.25 }}
                            className={styles.main}
                        >
                            {children}
                        </motion.main>
                    </motion.div>  
                </div>
            </div>
        )
    } else {
        // returns the children within the motion container, so that the animations occur, containing the subcomponent passed as a parameter
        return (
            <div
                className={classes.join(' ')}
            >
                { leftMenu ? <div className={styles.menuContainer}>
                    <LeftMenu />
                </div> : null }
                <div className={leftMenu ? styles.centralContainerLeftMenu : styles.centralContainer}>
                    { /* framer motion component which uses animation when it enters */ }
                    <motion.div
                        className={leftMenu ? styles.containerInnerWithMenu : styles.containerInner}
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{ type: 'ease-in-out', duration: 0.25 }}
                    >
                        <Head>
                            {/* Defines page head */}
                            <title>{title ? `${title} - ${siteName}` : siteName}</title>
                            <link rel="icon" href="/favicon.ico" />
                            <meta name="description" content={siteDescription} />
                            <meta name="og:title" content={siteName} />
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <link rel="icon" href="/favicon.ico" />
                        </Head>
                        <motion.main
                            style={{ height: '100%' }}
                            variants={enterVariants}
                            initial="hidden"
                            animate="enter"
                            transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.25 }}
                            className={styles.main}
                        >
                            {children}
                        </motion.main>
                    </motion.div>  
                </div>
            </div>
        )
    }
}

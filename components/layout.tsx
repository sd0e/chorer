// imports relevant tutorials
import Head from 'next/head';
import styles from './layout.module.css';
import { motion } from 'framer-motion';
import React from 'react';
import { InterClass } from '@/font';
import LeftMenu from './ui/leftMenu';

// defines site name and description, exported so they can be used throughout the programme
export const siteName = 'Chorer';
export const siteDescription = 'Chore Management System';

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

    // if displaying left menu, add flex styles to force menu to go on the left
    let classes = [ styles.wrapper, InterClass ];
    if (leftMenu) classes.push(styles.includesMenu);

    // returns the children within the motion container, so that the animations occur, containing the subcomponent passed as a parameter
    return (
        <div
            className={classes.join(' ')}
        >
            { leftMenu ? <div className={styles.menuContainer}>
                <LeftMenu />
            </div> : null }
            <div className={leftMenu ? styles.centralContainer : styles.centralContainerLeftMenu}>
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

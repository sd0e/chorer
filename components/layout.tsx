import Head from 'next/head';
import styles from './layout.module.css';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import React from 'react';

export const siteName = 'Chorer';
export const siteDescription = 'Chore Management System';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export default function Layout({ children, title }: { children: React.ReactNode, title?: string }) {
    const variants = {
        hidden: { opacity: 0, x: 0, y: 400 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -400 },
    }

    const enterVariants = {
        hidden: { opacity: 0, x: 0, y: 20 },
        enter: { opacity: 1, x: 0, y: 0 },
    }

    return (
        <div
            className={styles.wrapper}
        >
            <motion.div
                className={styles.container}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ type: 'ease-in-out', duration: 0.25 }}
            >
                <Head>
                    <title>{title ? `${title} - ${siteName}` : siteName}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="description" content={siteDescription} />
                    <meta name="og:title" content={siteName} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                <motion.main
                    style={{ height: '100%' }}
                    variants={enterVariants}
                    initial="hidden"
                    animate="enter"
                    transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.25 }}
                    className={styles.main}
                >
                    {/* <motion.span
                        variants={enterVariants}
                        initial="hidden"
                        animate="enter"
                        transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.15 }}
                        className={[inter.className, styles.mainPageTitle].join(' ')}
                    >
                        {title}
                    </motion.span> */}
                    {children}
                </motion.main>
            </motion.div>
        </div>
    )
}
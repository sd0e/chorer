import styles from './discIcon.module.css';
import React from 'react';
import { SvgIconComponent } from "@mui/icons-material";

export default function DiscIcon({ Icon, Colour } : { Icon: SvgIconComponent, Colour: string }) {
    return (
        <div
            className={styles.disc}
            style={{ backgroundColor: Colour }}
        >
            <Icon className={styles.icon} />
        </div>
    )
}
import styles from './iconGroup.module.css';
import React from 'react';
import { SvgIconComponent } from "@mui/icons-material";
import DiscIcon from './discIcon';

export default function IconGroup({ Icons } : { Icons: Array<[SvgIconComponent, string]> }) {
    return (
        <div className={styles.container} style={{ marginLeft: `${(Icons.length - 1) / 2}rem` }}>
            <div className={styles.wrapper}>
                {Icons.map((Icon, idx) => {
                    return <div className={styles.iconHolder} style={{ left: `${-0.5 * idx}rem` }} key={`discicon-${Icon[0]}`}>
                        <DiscIcon Icon={Icon[0]} Colour={Icon[1]} key={`disciconitem-${Icon[0]}`} />
                    </div>
                })}
            </div>
        </div>
    )
}
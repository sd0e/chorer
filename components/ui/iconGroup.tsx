import styles from './iconGroup.module.css';
import React from 'react';
import { SvgIconComponent } from "@mui/icons-material";
import DiscIcon from './discIcon';

export interface IIconGroup {
    icon: SvgIconComponent,
    colour: string
}

export default function IconGroup({ Icons } : { Icons: Array<IIconGroup> }) {
    return (
        <div className={styles.container} style={{ marginLeft: `${(Icons.length - 1) / 2}rem` }}>
            <div className={styles.wrapper}>
                {Icons.map((Icon, idx) => {
                    return <div className={styles.iconHolder} style={{ left: `${-0.5 * idx}rem` }} key={`discicon-${Icon.colour}`}>
                        <DiscIcon Icon={Icon.icon} Colour={Icon.colour} key={`disciconitem-${Icon.colour}`} />
                    </div>
                })}
            </div>
        </div>
    )
}
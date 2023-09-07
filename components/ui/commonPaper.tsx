import React from "react";
import { Paper } from "@mui/material";

export default function CommonPaper({ children, style }: { children: React.ReactNode, style?: object }) {
    const additionalStyles = style ? style : {};

    return <Paper sx={{ padding: '24px', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: '16px', width: 'calc(100% - 24px)', ...additionalStyles }} elevation={0}>
        {children}
    </Paper>
}
import React from 'react'
import { useState } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import { SpeedDial, Tooltip, Dialog } from '@mui/material'
import MetricChooser from './MetricChooser';
const MetricAccess = () => {
    const [open, setOpen] = useState(false)
    function handleClick() {
        setOpen(true)
    }
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <MetricChooser />
            </Dialog>
            <Tooltip title="Change metric" placement="left" xs={{ fontSize: 100 }}>
                <SpeedDial
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    ariaLabel="SpeedDial for metric access"
                    icon={<BarChartIcon />}
                    onClick={handleClick}
                >
                </SpeedDial>
            </Tooltip>
        </>
    )
}

export default MetricAccess
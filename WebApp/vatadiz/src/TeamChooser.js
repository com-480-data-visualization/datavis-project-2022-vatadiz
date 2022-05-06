import React, { useState, useContext } from 'react'
import Select from '@mui/material/Select';
import { MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import { appContext } from './App';
import { teamsMinimalist } from './ProcessedDataset'

const TeamChooser = () => {
    const context = useContext(appContext)
    const [team, setTeam] = useState("")
    function handleChange(e) {
        setTeam(e.target.value)
        context.dispatcher({ data: e.target.value, type: "teamChoose" })
    }
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={team}
                    label="Team"
                    onChange={handleChange} 
                >
                    {teamsMinimalist.map(x =>
                            (<MenuItem key={x.team_id} value={x.team_id}>
                                {x.team_name} 
                            </MenuItem>)
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}

export default TeamChooser
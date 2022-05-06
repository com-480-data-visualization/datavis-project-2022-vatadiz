import React, { useState, useContext } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, Box, FormControl, InputLabel } from '@mui/material';
import { appContext } from './App';
import { teamsMinimalist } from './ProcessedDataset';
import "./TeamChooser.css";

const TeamChooser = () => {
    const context = useContext(appContext)
    const [team, setTeam] = useState("")
    function handleChange(e) {
        setTeam(e.target.value)
        context.dispatcher({ data: e.target.value, type: "teamChoose" })
    }
    return (
        <div className="TeamChooser">
        <Box>
            <FormControl variant="filled" id="demo-simple-form-control" fullWidth>
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
        </div>
    )
}

export default TeamChooser
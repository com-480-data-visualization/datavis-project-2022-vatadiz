import React, { useEffect, useState, useContext } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, Box, FormControl, InputLabel, requirePropFactory } from '@mui/material';
import * as d3 from 'd3'
import { appContext } from './App';
import { teamsMinimalist } from './ProcessedDataset';
import { compose } from '@mui/system';


function drawTeamChooser(domElement, data, dispatcher){
    const domObject = d3.select(domElement)
    domObject.selectAll("*").remove();
    const container = domObject.append('svg')
                            .attr("preserveAspectRatio", "xMidYMid slice")
                            .attr("viewBox", "0 0 1000 70")
                            .classed("svg-content-responsive", true)

    var mouseover = d => {
        // console.log(d);
        d3.select(this)
            .attr("opacity", 0.5);
    }

    var mouseout = d => {
        d3.select(this)
            .attr("opacity", 1);
    }

    var mouseclick = function (mouse, data) {
        // console.log(data);
        dispatcher({data:data.team_id, type: "select_team_id"})
    }

    container.selectAll("#TeamLogo")
                .data(data)
                .enter()
                .append("svg:image")
                .attr("xlink:href", d => require("" + `./data/team_logos/${d.team_name.replace(" ", "_").toLowerCase()}.png`))
                .attr("width", 50).attr("height", 50)
                .attr("x", (d, i) => i * 65)
                .on("mouseover", mouseover)
                .on("click", mouseclick)
                .on("mouseout", mouseout);

    // container.append("svg:image")
            
}


const TeamChooser = ({state}) => {
    const context = useContext(appContext)
    

    useEffect(() => {
        drawTeamChooser(".TeamChooser", teamsMinimalist, context.dispatcher)
    })

    return (
        <div className="TeamChooser"></div>
    )
//     const [team, setTeam] = useState("")
//     function handleChange(e) {
//         setTeam(e.target.value)
//         context.dispatcher({ data: e.target.value, type: "select_team_id" })
//     }
//     return (
//         <div className="TeamChooser">
//         <Box>
//             <FormControl variant="filled" id="demo-simple-form-control" fullWidth>
//                 <InputLabel id="demo-simple-select-label">Team</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={team}
//                     label="Team"
//                     onChange={handleChange} 
//                 >
//                     {teamsMinimalist.map(x =>
//                             (<MenuItem key={x.team_id} value={x.team_id}>
//                                 {x.team_name} 
//                             </MenuItem>)
//                     )}
//                 </Select>
//             </FormControl>
//         </Box>
//         </div>
//     )
}

export default TeamChooser
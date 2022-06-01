import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, Box, FormControl, InputLabel, requirePropFactory } from '@mui/material';
import * as d3 from 'd3'
import { appContext } from './App';
import { teamsMinimalist } from './ProcessedDataset';
import { compose } from '@mui/system';


function drawTeamChooser(domElement, data, dispatcher){

    const growHeightFactor = 1.3
    const logoAttrs = {
        "xlink:href": d => require("" + `./data/team_logos/${d.team_name.replace(" ", "_").toLowerCase()}.png`),
        "width": 50, 
        "height": 50,
        "heightUpdate": (d) => 50 * (d.team_id != data.state.team_id ? 1 : growHeightFactor),
        "x": (d, i) => i * 65, 
        "opacity":(d) => d.team_id != data.state.team_id ? 1 : 0.6,
        'id': "team-logo"
    }

    const domObject = d3.select(domElement)
    // domObject.selectAll("*").remove();
    var container = domObject.select("svg");
    
    if (container.empty())
        container = domObject
                            .append('svg')
                            .attr("preserveAspectRatio", "xMidYMid slice")
                            .attr("viewBox", "0 0 1000 100")
                            .classed("svg-content-responsive", true)
    
    

    var logos = container.selectAll(".TeamLogo").data(data.teams);
    logos.exit().remove()

    logos.enter().append("svg:image").attr('class', "TeamLogo")
        .attr("xlink:href", logoAttrs["xlink:href"])
        .attr("width", logoAttrs.width)
        .attr("height", logoAttrs.height)
        .attr("x", logoAttrs.x)
        .style("opacity", logoAttrs.opacity);

    var mouseover = function(e, d) {
        d3.select(this).transition()        
        .duration(200)      
        .style("opacity", .6)
        .attr("height", logoAttrs.height*growHeightFactor)
    }

    var mouseout = function(e, d) {
        if (d.team_id !== data.state.team_id){
            d3.select(this).transition()        
                    .duration(200)      
                    .style("opacity", 1)  
                    .attr("height", logoAttrs.height);
        }
    }
    // console.log(data.state)
    var mouseclick = function (e, d) {
        dispatcher({data:d.team_id, type: "select_team_id"})
    }

    logos.on("mouseover", mouseover)
        .on("click", mouseclick)
        .on("mouseout", mouseout)
        .each(function(d,i) {
            if (d.team_id !== data.state.team_id){
                d3.select(this).transition()        
                        .duration(200)      
                        .style("opacity", 1)  
                        .attr("height", logoAttrs.height);
                console.log(d3.select(this).empty())
            }
        });
    
}


const TeamChooser = () => {
    const context = useContext(appContext)

    const data = {teams: teamsMinimalist,
                    state: context.state};
    useLayoutEffect(() => {
        drawTeamChooser(".TeamChooser", data, context.dispatcher)
    })

    return (
        <div className="TeamChooser"></div>
    )

}

export default TeamChooser
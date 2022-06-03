import React, {  useLayoutEffect, useContext } from 'react';
import * as d3 from 'd3'
import { appContext } from './App';
import { teamsMinimalist } from './ProcessedDataset';
import {motion} from "framer-motion"


function drawTeamChooser(domElement, data, dispatcher){
    console.log(teamsMinimalist)

    var container = d3.select(domElement);
    
    container.attr("class", "TeamChooserSVG")
            .attr("preserveAspectRatio", "xMidYMid slice")
            .attr("viewBox", "0 0 1400 200")
            .classed("svg-content-responsive", true);

    const contWidth = container.attr("viewBox").split(" ")[2] - 0;
    const contHeight = container.attr("viewBox").split(" ")[3] - 0;

    var x = d3.scaleLinear()
        .domain([-1, 1])
        .range([contWidth*0.07, contWidth*0.93]);
    var y = d3.scaleLinear()
        .domain([-1, 1])
        .range([contHeight*0.05, contHeight*0.95]);

    const growHeightFactor = 1.3
    const computeXVal = (i) => (i/data.teams.length*2 - 1)*1.15
    const logoAttrs = {
        "xlink:href": d => require("" + `./data/team_logos/${d.team_name.replace(" ", "_").toLowerCase()}.png`),
        "width": 75, 
        "height": 75,
        "x": (d, i) => x(computeXVal(i)), 
        "y": (d, i) => y(-computeXVal(i) * computeXVal(i) * 0.3 - 0.7), 
        "opacity": 0.5,
        'id': "team-logo"
    }
 
    
    var effectOn = (d3o) => {
        d3o.transition()        
            .duration(200)      
            .style("opacity", 1)
            .attr("height", logoAttrs.height*growHeightFactor)
            .attr("filter", null)
            .style("mix-blend-mode", "normal")
    }

    var effectOff = (d3o, d) => {
        if (d.team_id !== data.state.team_id){
            d3o.transition()        
                    .duration(200)      
                    .style("opacity", logoAttrs.opacity)  
                    .attr("height", logoAttrs.height)
                    .attr("filter", "url(#blur)")
                    .style("mix-blend-mode", "luminosity");
        }
    }
    
    var filter = container.append("defs")
                    .append("filter")
                    .attr("id", "blur")
                    .append("feGaussianBlur")
                    .attr("stdDeviation", 1); 

    var logos = container.selectAll(".TeamLogo").data(data.teams);
    
    var mouseclick = function (e, d) { dispatcher({data:d.team_id, type: "select_team_id"}) };
    var mouseover = function(e, d) { effectOn(d3.select(this)) };
    var mouseout = function(e, d) { effectOff(d3.select(this), d)};
    var resetEffect = function(d, i) { effectOff(d3.select(this), d)};
    logos.join(
        enter => enter.append("svg:image").attr('class', "TeamLogo")
                        .style("mix-blend-mode", "luminosity")
                        .attr("xlink:href", logoAttrs["xlink:href"])
                        .attr("width", logoAttrs.width)
                        .attr("height", logoAttrs.height)
                        .attr("x", logoAttrs.x)
                        .attr("y", logoAttrs.y)
                        .style("opacity", 0)
                        .attr("filter", "url(#blur)")
                        .on("mouseover", mouseover)
                        .on("click", mouseclick)
                        .on("mouseout", mouseout)
                        .transition().duration(2000).style("opacity", logoAttrs.opacity),
        update => update.on("mouseover", mouseover)
                    .on("click", mouseclick)
                    .on("mouseout", mouseout)
                    .each(resetEffect),
        exit => exit.remove()
    );
    
}


const TeamChooser = () => {
    const context = useContext(appContext)

    const data = {teams: teamsMinimalist,
                    state: context.state};
    useLayoutEffect(() => {
        drawTeamChooser(".TeamChooserSVG", data, context.dispatcher)
    })

    return (
        <motion.div className="TeamChooser"
        initial = {{opacity: 0,}}
        animate = {{opacity: 1,}}
        transition = {{duration: 1}}>
            <svg className="TeamChooserSVG"></svg>
        </motion.div>
    )

}

export default TeamChooser
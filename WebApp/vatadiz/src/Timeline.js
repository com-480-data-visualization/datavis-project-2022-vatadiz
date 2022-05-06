import React, { useEffect, useContext } from 'react'
import { Card } from '@mui/material'
import * as d3 from 'd3'
import { appContext } from './App';
import { getTeam} from './ProcessedDataset'

function drawTimeline(domElement, data, dispatcher) {
    const domObject = d3.select(domElement)
    domObject.selectAll("*").remove();
    const chart = domObject.append('svg').attr('width', "90%").attr('height', "100%")
    const triangle = d3.symbol().type(d3.symbolTriangle).size(250)
    const endOfLine = 95 // in percentage of its parent size
    const middleBarLength = 60
    const tickWidth = 3
    // timeline bar



    chart.append("line")
        .style("stroke", "black")
        .style("stroke-width", 5)
        .attr("x1", 0)
        .attr("y1", "50%")
        .attr("x2", `${endOfLine}%`)
        .attr("y2", "50%")
        .style("backggroupStage-color", "black")

    // Playoff/ groupStages separator
    chart.append("line")
        .style("stroke", "darkgrey")
        .style("stroke-width", 3)
        .attr("x1", `${endOfLine / 2}%`)
        .attr("y1", `${50 - middleBarLength / 2}%`)
        .attr("x2", `${endOfLine / 2}%`)
        .attr("y2", `${50 + middleBarLength / 2}%`)
    // timeline arrow tip 
    chart.append('svg')
        .attr('width', 50)
        .attr('height', 50)
        .attr("x", `${endOfLine}%`)
        .attr("y", "44.5%")
        .append('path')
        .attr("d", triangle)
        .style("fill", "red")
        .attr('transform', "translate(0,8 ) rotate(90)")


    // And now the tooltip !
    var Tooltip = d3.select('body')
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("backggroupStage-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    var mouseover = function (d) {
        Tooltip
            .transition(50)
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", 3)
            .style("opacity", 1)
    }

    var mousemove = function (mouse, d) {
        console.log(mouse.pageX, mouse.pageY)
        Tooltip
            .html("To know more about this game, please click !")
            .style("left", mouse.pageX + "px")
            .style("top", mouse.pageY + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .transition(200)
            .style("opacity", 0)
        // .style("left","0px")
        // .style("top", "0px")
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)

    }

    var mouseclick = function (mouse, data) {
        Tooltip.style("opacity", 0)
        dispatcher({data:data, type: "click"})
    }
    // Now I need to draw the ticks for each game
    const playoffData = data.playoff
    const groupStageData = data.groupStage
    console.log(groupStageData)
    const winColor = "darkgreen"
    const lossColor = "darkred"
    const roomPlay = (endOfLine / 2) / (playoffData.length + 1)
    const roomRound = (endOfLine / 2) / (groupStageData.length + 1)
    // FOR THE PLAYOFFS
    chart.selectAll("#playoff-ticks")
        .data(playoffData)
        .enter()
        .append("rect")
        .attr('id', "playoff-ticks")
        .attr("x", (d, i) => {
            const posX = endOfLine / 2 + (i + 1) * roomPlay
            return `${posX}%`
        })
        .attr("y", '40%')
        .attr("width", tickWidth)
        .attr("height", 30)
    //// Win-loss Circles

    chart.selectAll("#playoff-circle    ")
        .data(playoffData)
        .enter()
        .append("circle")
        .attr('id', "playoff-circle")
        .attr("cx", (d, i) => {
            const posX = endOfLine / 2 + (i + 1) * roomPlay + 0.25
            return `${posX}%`
        })
        .attr("cy", '35%')
        .attr("r", 10)
        .attr("fill", (d) => d.won ? winColor : lossColor)
        .attr("height", 30)
    // For the Rounds

    chart.selectAll("#groupStage-ticks")
        .data(groupStageData)
        .enter()
        .append("rect")
        .attr('id', "groupStage-ticks")
        .attr("x", (d, i) => {
            const posX = (i + 1) * roomRound
            return `${posX}%`
        })
        .attr("y", '40%')
        .attr("width", tickWidth)
        .attr("height", 30)

    chart.selectAll("#groupStage-circle")
        .data(groupStageData)
        .enter()
        .append("circle")
        .attr('id', "groupStage-circle")
        .attr("cx", (d, i) => {
            const posX = (i + 1) * roomRound + 0.25
            return `${posX}%`
        })
        .attr("cy", '35%')
        .attr("r", 10)
        .attr("fill", (d) => d.won ? winColor : lossColor)
        .attr("height", 30)

    chart.selectAll("circle")
        .on("mouseover", mouseover)
        // .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click", mouseclick)


}



const Timeline = ({state}) => {
    const context = useContext(appContext);

    var matches = getTeam(state.team_id).matches;

    // const data = {
    //     playoff: [{ match_id: 10, won: true }, { match_id: 10, won: false }, { match_id: 10, won: true }, { match_id: 10, won: false }, { match_id: 10, won: true }, { match_id: 10, won: true }],
    //     groupStage: [{ match_id: 10, won: true }, { match_id: 5, won: false }],
    // }

    const data = {
        playoff: [],
        groupStage: [],
    }
    
    matches.forEach(match => {
        var entry = {match_id: match.match_id, won: match[match.selected_team].winner};
        if (match.stage === "Group Stage")
            data.groupStage.push(entry);
        else if (match.stage === "Playoffs")
            data.playoff.push(entry);
    })

    useEffect(
        () => {
            drawTimeline(".visu", data, context.dispatcher)
        },
    )

    return (
        <Card className="Timeline" variant="outlined">
            <div className="visu"></div>
        </Card>
    )
}

export default Timeline
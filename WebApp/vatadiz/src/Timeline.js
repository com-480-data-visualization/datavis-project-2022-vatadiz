import React, { useEffect, useContext } from 'react'
import * as d3 from 'd3'
import { appContext } from './App';
import { getTeam, getTeamMatch, computeGameMetric, computeMatchMetric} from './ProcessedDataset'

function drawTimeline(domElement, data, dispatcher) {
    const domObject = d3.select(domElement)
    domObject.selectAll("*").remove();
    const chart = domObject.append('svg')
                            .attr("preserveAspectRatio", "xMidYMid slice")
                            .attr("viewBox", "0 0 1000 200")
                            .classed("svg-content-responsive", true)
    const triangle = d3.symbol().type(d3.symbolTriangle).size(250)
    const middleBarLength = 100
    const tickProperties = {width: 2, height: 20};
    
    const winColor = "darkgreen"
    const lossColor = "darkred"
    const chartWidth = chart.attr("viewBox").split(" ")[2] - 0;
    const chartHeight = chart.attr("viewBox").split(" ")[3] - 0;
    
    const xRange = {left:0.05*chartWidth, right: 0.95*chartWidth};
    const yRange = {down:0.95*chartHeight, up: 0.05*chartHeight}

    var uix = d3.scaleLinear()
                .domain([0, 100])
                .range([xRange.left, xRange.right]);
    var uiy = d3.scaleLinear()
                .domain([0, 100])
                .range([yRange.up, yRange.down]);

    const timelineProperties = {y: uiy(80)};

    var x = d3.scaleLinear()
                .domain([-0.5, data.points.length])
                .range([xRange.left, xRange.right]);
    var y = d3.scaleLinear()
                .domain([0, d3.max(data.points.map(d => d.metric))])
                .range([timelineProperties.y, uiy(5)]);

    // timeline bar
    chart.append("line")
        .style("stroke", "black").style("stroke-width", 5)
        .attr("x1", xRange.left).attr("y1", timelineProperties.y)
        .attr("x2", xRange.right).attr("y2", timelineProperties.y)
        .style("backggroupStage-color", "black")

    if (data.separation >= 0){
        // Playoff/ groupStages separator
        chart.append("line")
            .style("stroke", "darkgrey").style("stroke-width", 3)
            .attr("x1", x(data.separation)).attr("y1", uiy(50 - middleBarLength / 2))
            .attr("x2", x(data.separation)).attr("y2", uiy(50 + middleBarLength / 2));

    }
    // timeline arrow tip 
    chart.append('svg')
        .attr('width', 50).attr('height', 50)
        .attr("x",xRange.right).attr("y", timelineProperties.y - 8)
        .append('path')
        .attr("d", triangle)
        .style("fill", "black")
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
        dispatcher({data:data.id, type: data.interactionType})
    }
    
    chart.selectAll("#event-ticks")
        .data(data.points)
        .enter()
        .append("rect")
        .attr('id', "event-ticks")
        .attr("x", d => x(d.number)).attr("y", timelineProperties.y - tickProperties.height/2)
        .attr("width", tickProperties.width)
        .attr("height", tickProperties.height)
    
    //// Win-loss Circles
    chart.selectAll("#event-circle")
        .data(data.points)
        .enter()
        .append("circle")
        .attr('id', "event-circle")
        .attr("cx", d => x(d.number)).attr("cy", timelineProperties.y + tickProperties.height)
        .attr("r", 10)
        .attr("fill", d => d.won ? winColor : lossColor)
        .attr("height", 30)
        .on("mouseover", mouseover)
        // .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click", mouseclick)
    // For the Rounds

        

    
    
    var valueline = d3.line()
        .x(d => x(d.number))
        .y(d => y(d.metric));

    chart.append("path")
        .data([data.points])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("stroke", "#2e2e2e")
        .attr("stroke-width", 2)
        .attr("fill", "none");

}

export const TeamTimeline = ({state}) => {
    const context = useContext(appContext);

    var matches = getTeam(state.team_id).matches;

    const data = {
        points: [],
        separation: -1
    }

    var i = 0;
    matches.forEach(match => {
        var entry = {id: match.match_id,
                     number: i,
                     won: match[match.selected_team].winner,
                     metric: computeMatchMetric(match, match.selected_team),
                     interactionType: "select_match_id"};
        if (data.separation < 0 && match.stage === "Playoffs")
            data.separation = i - 0.5
        data.points.push(entry);
        i++;
    })
    if (data.separation < 0)
        data.separation = i - 0.5;

    useEffect(
        () => {
            drawTimeline(".TeamTimeline", data, context.dispatcher)
        },
    )

    return (
        <div className="TeamTimeline"></div>
    )
}

export const MatchTimeline = ({state}) => {
    const context = useContext(appContext);
    
    var match = getTeamMatch(state.team_id, state.match_id)
    var games = match.games;
    
    const data = {
        points: [],
        separation: -1
    }
    var i = 0;
    games.forEach(game => {
        var entry = {id: game.game_id,
                     number: i,
                     won: game[match.selected_team].winner,
                     metric: computeGameMetric(game, match.selected_team),
                     interactionType: "select_game_id"};
        data.points.push(entry);
        i++;
    })


    useEffect(
        () => {
            drawTimeline(".MatchTimeline", data, context.dispatcher)
        },
    )

    return (
        <div className="MatchTimeline"></div>
    )
}

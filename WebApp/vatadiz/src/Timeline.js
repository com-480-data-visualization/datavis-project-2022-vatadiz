import React, { useEffect, useLayoutEffect, useContext } from 'react'
import * as d3 from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import { appContext } from './App';
import { getTeam, getTeamMatch, computeGameMetric, computeMatchMetric} from './ProcessedDataset'

function drawTimeline(domElement, data, dispatcher) {
    var chart = d3.select(domElement);
    
    chart
        .classed("svg-content-responsive", true)
        .attr("viewBox", "0 0 1000 300")
        .attr("preserveAspectRatio", "xMidYMid slice")

    const baseTransi = d3.transition().duration(350)
    
    const winColor = "#2678c9"
    const lossColor = "#0c1117"
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
    const circleProperties = {y: timelineProperties.y + 20};
    const tickProperties = {width: 0.5, height: chartHeight*0.8, opacity: 0.6};
    const separatorProperties = {y1:timelineProperties.y + uiy(3), y2: uiy(0)}

    var x = d3.scaleLinear()
                .domain([-0.5, data.points.length-0.45])
                .range([xRange.left, xRange.right]);
    var y = d3.scaleLinear()
                .domain([0, d3.max(data.points.map(d => d.metric))])
                .range([timelineProperties.y, uiy(5)]);

    

    // timeline bar
    chart.selectAll("line.TimelineAxis").data([0])
        .join(
            enter => enter.append("line")
                        .attr('class', "TimelineAxis")
                        .style("stroke", "black").style("stroke-width", 2)
                        .attr("x1", xRange.left).attr("y1", timelineProperties.y)
                        .attr("x2", xRange.right).attr("y2", timelineProperties.y)
                        .style("backggroupStage-color", "black")
                        .attr("opacity", 0),
            update => update,
            exit => exit.remove()
    ).transition(baseTransi).attr("opacity", 1);


    if (data.separation >= 0){
        // Playoff/ groupStages separator
        chart.selectAll("line.Separator").data([0,1])
            .join(
                enter => enter.append("line")
                            .attr('class', "Separator")
                            .style("stroke", "black").style("stroke-width", 2)
                            .style("opacity", 0.6)
                            .attr("y1", uiy(110)).attr("y2", uiy(110))
                            .attr("x1", x(data.separation))
                            .attr("x2", x(data.separation)),
                update => update.
                            transition(baseTransi)
                            .attr("x1", d => x(data.separation)+ d*3)
                            .attr("x2", d => x(data.separation)+ d*3),
                exit => exit.remove()
        ).transition(baseTransi).attr("y1", separatorProperties.y1).attr("y2", separatorProperties.y2);
    }
    
    // And now the tooltip !
    // var Tooltip = d3.select('body')
    //     .append("div")
    //     .style("opacity", 0)
    //     .attr("class", "tooltip")
    //     .style("backggroupStage-color", "white")
    //     .style("border", "solid")
    //     .style("border-width", "2px")
    //     .style("border-radius", "5px")
    //     .style("padding", "5px")

    var mouseover = function (d) {
        // Tooltip
        //     .transition(50)
        //     .style("opacity", 1)
        d3.select(this)
            .style("stroke", "white")
            .style("stroke-width", 2)
            .style("opacity", 1)
    }

    var mousemove = function (mouse, d) {
        console.log(mouse.pageX, mouse.pageY)
        // Tooltip
        //     .html("To know more about this game, please click !")
        //     .style("left", mouse.pageX + "px")
        //     .style("top", mouse.pageY + "px")
    }
    var mouseleave = function (d) {
        // Tooltip
        //     .transition(200)
        //     .style("opacity", 0)
        // .style("left","0px")
        // .style("top", "0px")
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    var mouseclick = function (mouse, data) {
        // Tooltip.style("opacity", 0)
        dispatcher({data:data.id, type: data.interactionType})
    }
    
    chart.selectAll("rect." + data.eventType + "Ticks").data(data.points, d => d.id)
        .join(
            enter => enter
                .append("rect")
                .attr('class', data.eventType + "Ticks")
                .attr("width", tickProperties.width).attr("height", tickProperties.height)
                .attr("opacity", 0)
                .attr("x", d => x(d.number))
                .attr("y", timelineProperties.y - tickProperties.height * 0.9),
            update => update.transition(baseTransi).attr("x", d => x(d.number)),
            exit => exit.transition(baseTransi)
                .attr("opacity", 0)
                .remove()
    ).transition(baseTransi).attr("opacity", tickProperties.opacity)
    
    //// Win-loss Circles
    chart.selectAll("circle."+ data.eventType + "Event").data(data.points, d => d.id)
        .join(
            enter => enter
                .append("circle")
                .attr('class', data.eventType + "Event")
                .attr("r", 10)
                .attr("height", 30)
                .attr("cx", d => x(d.number))
                .attr("cy", circleProperties.y + 60)
                .attr("fill", d => d.won ? winColor : lossColor)
                .on("mouseover", mouseover)
                .style("opacity", 0)
                // .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)
                .on("click", mouseclick),
            update => update.transition(baseTransi).attr("cx", d => x(d.number)),
            exit => exit.transition(baseTransi)
                    .attr("cy", circleProperties.y + 60)
                    .style("opacity", 0)
                    .remove()
    ).transition(baseTransi).attr("cy", circleProperties.y).style("opacity", 0.9)
    // For the Rounds
        
    // var valueline = d3
    //     .line()
    //     .x(d => x(d.number))
    //     .y(d => y(d.metric))
    //     .curve(d3.curveCatmullRom);

    var valueline = d3
        .area()
        .x(d => x(d.number))
        .y0(d => timelineProperties.y)
        .y1(d => y(d.metric))
        .curve(d3.curveCatmullRom);
    
    chart.selectAll("path." + data.eventType + "Metric").data([data.points])
        .join(
            enter => enter.append("path").attr("class", data.eventType + "Metric")
                    .attr("stroke", "#222222")
                    .attr("stroke-width", 0)
                    .attr("fill", "#1d1d1d22")
                    .attr("opacity", 0.4)
                    .attr("d", valueline),
            update =>  update.transition(baseTransi).attrTween('d',  function(d) {
                return interpolatePath(d3.select(this).attr("d"), valueline(d)); 
              }),
            exit => exit.remove()
    ).transition(baseTransi).attr("stroke-width", 0.4);

}

export const TeamTimeline = () => {
    const context = useContext(appContext);
    
    var matches = getTeam(context.state.team_id).matches;

    const data = {
        points: [],
        separation: -1,
        eventType: "Match"
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

    useLayoutEffect(
        () => {
            drawTimeline(".TeamTimelineSVG", data, context.dispatcher)
        },
    )

    return (
        <div className="TeamTimeline">
            <svg className="TeamTimelineSVG">

            </svg>
        </div>
    )
}

export const MatchTimeline = () => {
    const context = useContext(appContext);
    
    
    var match = getTeamMatch(context.state.team_id, context.state.match_id)
    var games = match.games;
    
    const data = {
        points: [],
        separation: -1,
        eventType: "Game"
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


    useLayoutEffect(
        () => {
            drawTimeline(".MatchTimelineSVG", data, context.dispatcher)
        },
    )
    
    return (
        <div className="MatchTimeline">
            <svg className="MatchTimelineSVG"></svg>
        </div>
    )
}

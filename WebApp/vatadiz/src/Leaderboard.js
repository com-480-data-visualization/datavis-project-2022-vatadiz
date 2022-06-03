import { React, useEffect } from 'react'
import * as d3 from 'd3'

function drawLeaderboard(domElement, data) {
    var leaderboard = d3.select(domElement)
    leaderboard.attr("preserveAspectRatio", "xMidYMid slice")
            .attr("viewBox", "0 0 250 250")
            .classed("svg-content-responsive", true)
    const baseTransi = leaderboard.transition().duration(300)
    const chartWidth = leaderboard.attr("viewBox").split(" ")[2] - 0;
    const chartHeight = leaderboard.attr("viewBox").split(" ")[3] - 0;

    const xRange = {left:0.20*chartWidth, right: 0.80*chartWidth};
    const yRange = {down:0.80*chartHeight, up: 0.20*chartHeight}
    
    // sort data
    data.sort(function(b, a) {
       return a.team_score - b.team_score;
     });

     var color = d3.scaleOrdinal()
     .domain(data.map(d => d.team_id))
     .range(d3.schemeDark2);

    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.team_name}))
        .range([xRange.left, xRange.right])

    leaderboard.append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(10,-60)rotate(90)")
      .style("text-anchor", "end");

    var y = d3.scaleLinear()
        .domain([0, 1000])
        .range([yRange.down, yRange.up]);

    leaderboard.append("g")
    .attr("transform", "translate(" + (xRange.left-5) + ", 0)")
    .call(d3.axisLeft(y));


        leaderboard.selectAll("rect.LeaderboardBar").data(data, d => d.team_id)
        .join(
            enter => enter
                .append("rect")
                .attr("x", function(d) { return x(d.team_name); })
                .attr("width", x.bandwidth())
                .attr("fill", d => color(d.team_id))
                 // no bar at the beginning thus:
                .attr("height", function(d) { return yRange.down - y(0); }) // always equal to 0
                .attr("y", function(d) { return y(0); })
                .attr("class", "LeaderboardBar"), 
            update => update,
            exit => exit.remove()
    );

    // Animation
    leaderboard.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.team_score); })
        .attr("height", function(d) { return yRange.down - y(d.team_score); })
        .delay(function(d,i){console.log(i) ; return(i*100)});   
        
}

const Leaderboard = ({data}) => {
    useEffect(
        () => {
            drawLeaderboard(".LeaderboardSVG", data)
        },
    )

    return (
        <div className="Leaderboard">
            <svg className="LeaderboardSVG"></svg>
        </div>
    )
}

export default Leaderboard
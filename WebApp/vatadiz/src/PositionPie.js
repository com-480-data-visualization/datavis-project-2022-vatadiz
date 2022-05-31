import { React, useEffect } from 'react'
import * as d3 from 'd3'



function drawPie(domElement, data) {
    const domObject = d3.select(domElement)
    domObject.selectAll("*").remove();
    const svg = domObject.append('svg')
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("viewBox", "0 0 250 250")
        .classed("svg-content-responsive", true)
    const radius = 150  
    const g = svg.append("g")
        .attr("transform", "translate(125,125)");
    var pie = d3.pie()


    var arc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.3);

    var arcs = g.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");
    // Appending path 
    arcs.append("path")
        .attr("fill", (data, i) => {
            // let value = data.data;
            return d3.schemeSet2[i];
        })
        .attr("d", arc);

}

const PositionPie = () => {
    useEffect(
        () => {
            drawPie(".pie", [1, 2, 3, 4, 5])
        },
    )

    return (
        <div className="pie">PositionPie</div>
    )
}

export default PositionPie
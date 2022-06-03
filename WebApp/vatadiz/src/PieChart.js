import { React, useEffect } from 'react'
import * as d3 from 'd3'

function drawPie(domElement, data) {
    var piechart = d3.select(domElement)
    piechart.attr("preserveAspectRatio", "xMidYMid slice")
            .attr("viewBox", "0 0 250 250")
            .classed("svg-content-responsive", true)

    const chartWidth = piechart.attr("viewBox").split(" ")[2] - 0;
    const chartHeight = piechart.attr("viewBox").split(" ")[3] - 0;
    const baseTransi = piechart.transition().duration(300)
    const radius = 130
    const chartContainer = piechart.selectAll("g.PieChart").data([0])
        .join(
            enter => enter
                .append("g")
                .attr("transform", "translate("+chartWidth/2+","+chartHeight/2+")")
                .attr("class", "PieChart"),
            update => update,
            exit => exit.remove()
    );
    var pie = d3.pie().value(d => d[1]).sort(null);;

    var arc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.3);
    

    const pieData = pie(Object.entries(data))
    chartContainer.selectAll("path.PieChart").data(pieData).join(
        enter => enter
            .append("path")
            .attr("class", "PieChart")
            .attr("fill", (data, i) => d3.schemeSet2[i])
            .attr("d", arc),
        update => update.transition(baseTransi).attr("d", arc),
        exit => exit.remove()
    );

    chartContainer.selectAll("text.PieChart").data(pieData).join(
        enter => enter
            .append("text")
            .attr("class", "PieChart")
            .text(d => d.data[0])
            .attr("fill", "white")
            .style("mid-blend-mode", "exclusion")
            .attr("transform", d => "translate(" + arc.centroid(d) + ")")
            .style("text-anchor", "middle").style("font-size", 20),
        update => update.transition(baseTransi)
            .attr("transform", d => "translate(" + arc.centroid(d) + ")")
            .text(d => d.data[0]),
        exit => exit.remove()
    );

}

const PieChart = ({data}) => {
    useEffect(
        () => {
            drawPie(".PieChartSVG", data)
        },
    )

    return (
        <div className="PieChart">
            <svg className="PieChartSVG"></svg>
        </div>
    )
}

export default PieChart
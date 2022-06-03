import { keys } from '@mui/system';
import * as d3 from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import * as wmrlcs from './ProcessedDataset'


export function drawTimelineStackedAreaPlot(chart, data, x, y, transi){
    
    // var data = [{"match_nb":1, "core_shots":0.4, "core_saves":0.1, "core_assists":0.3, "core_goals":0.5},
    //             {"match_nb":2, "core_shots":0.2, "core_saves":0.4, "core_assists":0.2, "core_goals":0.2},
    //             {"match_nb":3, "core_shots":0.1, "core_saves":0.2, "core_assists":0.6, "core_goals":0.7},
    //             {"match_nb":4, "core_shots":0.1, "core_saves":0.2, "core_assists":0.2, "core_goals":0.6}]

    const keys = Object.keys(data.factors);
    
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeSet3);
    
    var stackedData = d3.stack()
        .keys(keys)
        .offset(d3.stackOffsetDiverging)
        .order(d3.stackOrderNone)
            (data.points.map(d => {
                var dict = Object.assign({}, d.stackedMetric)
                dict["number"] = d.number
                return dict;
            }))

    
    chart.selectAll("text.StackAreaPlotTooltip").data([0])
        .join(
            enter => enter.append("text")
                .attr("class", "StackAreaPlotTooltip")
                .attr("x", x(0))
                .attr("y", y(1))
                .style("opacity", 0)
                .style("font-size", 17),
            update => update,
            exit => exit.remove()
    )

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        chart.selectAll("text.StackAreaPlotTooltip").style("opacity", 1);
        chart.selectAll("path.StackAreaPlot")
            .style("opacity", .2);
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 0.8);
    }

    var mousemove = function(d,e) {
        chart.selectAll("text.StackAreaPlotTooltip").text(keys[e.index]);
    }

    var mouseleave = function(d) {
        chart.selectAll("text.StackAreaPlotTooltip").style("opacity", 0);
        chart.selectAll("path.StackAreaPlot").style("opacity", 0.8).style("stroke", "none");
    }

    // Area generator
    var area = d3.area()
        .x(d =>  x(d.data.number) )
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
        .curve(d3.curveCatmullRom)
        

    chart.selectAll("path.StackAreaPlot").data(stackedData)
        .join(
            enter => enter.append("path")
                .attr("class", "StackAreaPlot")
                .style("fill", function(d) { return color(d.key); })
                .attr("d", area)
                .style("mix-blend-mode", "darken")
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave),
            update => update
                        .on("mouseover", mouseover)
                        .on("mousemove", mousemove)
                        .on("mouseleave", mouseleave)
                        .transition(transi).attrTween('d',  function(d) {
                            return interpolatePath(d3.select(this).attr("d"), area(d)); 
                        }),
            exit => exit.remove()
    )
}

export function drawTimelineAreaPlot(chart, data, x, y, transi){
    var valueline = d3
        .area()
        .x(d => x(d.number))
        .y0(d => y(0))
        .y1(d => y(d.metric))
        .curve(d3.curveCatmullRom);
    chart.selectAll("path." + data.eventType + "Metric").data([data.points])
        .join(
            enter => enter.append("path")
                .attr("class", data.eventType + "Metric")
                .attr("stroke", "#222222")
                .attr("stroke-width", 0)
                .attr("fill", "#1d1d1d22")
                .attr("opacity", 0.4)
                .attr("d", valueline),
            update =>  update.transition(transi).attrTween('d',  function(d) {
                return interpolatePath(d3.select(this).attr("d"), valueline(d)); 
              }),
            exit => exit.remove()
    ).transition(transi).attr("stroke-width", 0.4);
}
import React, { useRef, useLayoutEffect, useContext, useEffect } from 'react'
import * as d3 from 'd3';
import { interpolatePath } from 'd3-interpolate-path';
import * as wmrlcs from './ProcessedDataset'
import {motion} from "framer-motion"

export const initialMetricFactors = {
    core_shots_normalized: 0.8,
    core_goals_normalized: 0.5,
    core_saves_normalized:-0.5,
    boost_bcpm_normalized: 0.4,
    boost_amount_stolen_big_normalized: 1,
    movement_time_supersonic_speed_normalized: 0.2,
    movement_time_high_air_normalized: 0.4,
    positioning_time_defensive_third_normalized: -0.9,
    positioning_time_offensive_third_normalized: 0.9,
    demo_inflicted_normalized: 0.6
    // boost_amount_overfill_stolen_normalized: 0.2,
    // "positioning_time_in_front_ball_normalized":
    // "ball_time_in_side_normalized": -0.4
}

export const metricKeyName = s => s.slice(0, -11).replaceAll("_", " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

export function computeStackedTeamMetric(team_id, event, state){
    const stats = wmrlcs.getTeamNormalizedStats(team_id, event)   

    // var metric = Object.entries(factors).forEach(element => stats[element[0]] === undefined ? console.log(element[0]) : 0);
    const count = Object.keys(state.factors).length
    var stackedMetric = Object.entries(state.factors)
        .reduce((acc, entry) => {
            const submetric = (stats[entry[0]] * entry[1] - state.negativeSum/count)/(state.positiveSum - state.negativeSum)
            acc[metricKeyName(entry[0])] = submetric;
            return acc;
        }, {});
    
    return stackedMetric;
}

export function getMetricFactors(state){
    const factors = Object.fromEntries(Object.entries(state.factors)
        .sort((a,b) => a[1] < b[1])
        .map(entry => [metricKeyName(entry[0]), entry[1]]))
    
    return factors
}

export function computeTeamMetric(team_id, event, state){
    const stats = wmrlcs.getTeamNormalizedStats(team_id, event)
    var metric = Object.entries(state.factors).reduce((acc, entry) => acc + stats[entry[0]] * entry[1], 0);
    metric = (metric - state.negativeSum)/(state.positiveSum - state.negativeSum);

    return metric;
}




import React from 'react'
import { useContext, useState } from 'react';
import { appContext } from './App';
import { Card, Slider, Grid, Button, Snackbar, Alert, Typography } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import { metricKeyName } from './InteractiveMetric';

// const count = Object.keys(state.factors).length
const MetricChooser = () => {
    const context = useContext(appContext)
    const [new_metric, setState] = useState(JSON.parse(JSON.stringify(context.state.factors)))
    const [open, setOpen] = useState(false)

    const colors = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]
    const color_dict = {}
    Object.keys(new_metric).forEach((metric_name, index) => color_dict[metric_name] = colors[index])
    const positive_dict = Object.keys(new_metric)
        .map(value => [value, new_metric[value] >= 0 ? 1 : -1])
        .reduce(function (map, obj) {
            map[obj[0]] = obj[1];
            return map;
        }, {});

    function handleChange(metric, value) {
        let temp_metric = JSON.parse(JSON.stringify(new_metric))
        temp_metric[metric] = value
        setState(temp_metric)
    }

    function handleClick() {

        context.dispatcher({ data: new_metric, type: "select_metric_factor" })
        setOpen(true)
    }
    return (
        <Card variant="outlined" className="MetricChooser" >
            <Snackbar open={open} autoHideDuration={1500} onClose = {() => setOpen(false)} xs={{ width: '100%' }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Custom metric chosen !
                </Alert>
            </Snackbar>
            <Grid container direction="column" alignItems="center">
                <Grid item>
                    <Typography sx = {{fontSize: 25, textAlign:  "center"}} >
                        Metric Chooser
                    </Typography>
                    <br/>
                </Grid>
                <Grid container item xs={12}>
                    {Object.keys(new_metric).map(
                        (metric_name) => (
                            <Grid container item orientation="row" alignItems="center" justifyContent="space-evenly">
                                <Grid item xs={5}>
                                    <Slider
                                        orientation="horizontal"
                                        style = {{color: color_dict[metric_name]}}
                                        step={0.01}
                                        min={positive_dict[metric_name] === 1 ? 0.00001 : -1}
                                        max={positive_dict[metric_name] === 1 ? 1 : 0.000001}
                                        value={new_metric[metric_name]}
                                        onChange={(value, val2) => handleChange(metric_name, val2)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    {metricKeyName(metric_name) + " : " + new_metric[metric_name]}
                                </Grid>
                            </Grid>
                        )
                    )}
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleClick}>
                        Validate this metric
                    </Button>
                </Grid>
            </Grid>

        </Card>
    )
}

export default MetricChooser
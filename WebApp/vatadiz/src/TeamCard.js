import React, { useContext } from 'react';
import { appContext } from './App';
import { Card, CardHeader, CardContent, CardMedia, Typography, Grid, Box, Divider } from '@mui/material'
import { getTeam } from './ProcessedDataset'
import PositionPie from './PositionPie'
import Recap from './Recap'
import team_descr from "./data/team_descr.json"
import {motion} from "framer-motion"
const TeamCard = () => {
    const context = useContext(appContext)
    const team = getTeam(context.state.team_id)
    return (
        <motion.div
        initial = {{opacity: 0, x: 100}}
        animate = {{opacity: 1, x: 0 }}
        transition = {{duration: 0.6}}
        >
        <Box display="inline-block" sx={{ width: '90%' }}>
            <Card>
                <CardHeader
                    avatar={
                        <CardMedia
                            component="img"
                            height="50"
                            image={require("" + `./data/team_logos/${team.team_name.replace(" ", "_").toLowerCase()}.png`)}
                            alt={team.team_name}
                        />
                    }

                    title={team.team_name}
                // subheader="September 14, 2016"
                />
                <Divider/>
                <CardContent>
                    <Grid container
                        direction="row"
                    >
                        <Grid container direction="column" item xs={9}>
                            <Grid item >
                                <Typography variant="body2" color="text.secondary" align="left">
                                    <motion.div animate = {{fontSize: 30 }}>
                                    {team_descr[team.team_name.replace(" ", "_").toLowerCase()]}
                                    </motion.div>
                                </Typography>
                            </Grid>
                            <Grid item  >
                                    <Recap props={team.match_stats_average} />
                                </Grid>
                            <Grid container direction="row" item xs={5}>
                                <Grid item xs = {6}>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <PositionPie />

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
        </motion.div>
    )
}

export default TeamCard
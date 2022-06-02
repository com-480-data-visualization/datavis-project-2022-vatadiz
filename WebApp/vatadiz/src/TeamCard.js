import React, { useContext } from 'react';
import { appContext } from './App';
import { Card, CardHeader, CardContent, CardMedia, Typography, Grid, Box, Divider } from '@mui/material'
import * as wmrlcs from './ProcessedDataset'
import PieChart from './PieChart'
import Recap from './Recap'
import team_descr from "./data/team_descr.json"
import {motion} from "framer-motion"
const TeamCard = () => {
    const context = useContext(appContext)
    const team = wmrlcs.getTeam(context.state.team_id)
    
    const chosen_stats = team.match_stats_average
    const pie_data = {"Goals": chosen_stats.core_goals_normalized.toFixed(2),
                      "Shoots": chosen_stats.core_shots_normalized.toFixed(2),
                      "Saves": chosen_stats.core_saves_normalized.toFixed(2),
                      "Assists": chosen_stats.core_assists_normalized.toFixed(2)}

    return (
        <motion.div
        initial = {{opacity: 0, x: 200}}
        animate = {{opacity: 1, x: 0 }}
        transition = {{duration: 0.7}}
        >
        <Box display="inline-block" sx={{ width: '90%' }}>
            <Card>
                <CardHeader
                    avatar={
                        <CardMedia
                            component="img"
                            height="50"
                            image={wmrlcs.getTeamLogo(team.team_id)}
                            alt={team.team_name}
                        />
                    }
                    title={team.team_name + " - " + team.team_region}
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
                                    <Recap props={chosen_stats} />
                                </Grid>
                            <Grid container direction="row" item xs={5}>
                                <Grid item xs = {6}>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <PieChart data={pie_data}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
        </motion.div>
    )
}

export default TeamCard
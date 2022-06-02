import React, { useEffect, useState, useContext } from 'react';
import { appContext } from './App';
import { Card, CardHeader, CardContent, CardMedia, Typography, Grid, Box, Divider } from '@mui/material'
import { getTeam } from './ProcessedDataset'
import PositionPie from './PositionPie'
import Recap from './Recap'
import team_descr from "./data/team_descr.json"
const TeamCard = () => {
    const context = useContext(appContext)
    const team = getTeam(context.state.team_id)
    return (
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
                                    {team_descr[team.team_name.replace(" ", "_").toLowerCase()]}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" item xs={5}>
                                <Grid item xs = {6}>

                                </Grid>
                                <Grid item xs={6} >
                                    <Recap props={team.match_stats_average} />
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
    )
}

export default TeamCard
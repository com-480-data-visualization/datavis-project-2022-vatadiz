import React, { useEffect, useState, useContext } from 'react';
import { appContext } from './App';
import { Card, CardHeader, CardContent, CardMedia, Typography, Grid, Box, Divider } from '@mui/material'
import { getTeam } from './ProcessedDataset'
import PositionPie from './PositionPie'
import Recap from './Recap'
const team_description = `
Dignitas, formerly known as Team Dignitas, is a professional esports organization based in Newark, New Jersey,
 founded by Michael "ODEE" O'Dell on 9 September 2003 as a merger of two top Battlefield 1942 clans. Dignitas was acquired by
  the Philadelphia 76ers in September 2016. The team is best known for its League of Legends, Rocket League, and Counter-Strike: 
  Global Offensive squads.
`
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
                        <Grid container direction="column" item xs={10}>
                            <Grid item >
                                <Typography variant="body2" color="text.secondary" align="left">
                                    {team_description}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" item xs={5}>
                                <Grid item xs = {8}>

                                </Grid>
                                <Grid item xs={4} >
                                    <Recap props={team.match_stats_average} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <PositionPie />

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default TeamCard
import React from 'react'
import { Card, CardHeader, CardContent, CardMedia, Typography, Grid } from '@mui/material'
import { getTeam } from './ProcessedDataset'
import PositionPie from './PositionPie'

const team_description = `
Dignitas, formerly known as Team Dignitas, is a professional esports organization based in Newark, New Jersey,
 founded by Michael "ODEE" O'Dell on 9 September 2003 as a merger of two top Battlefield 1942 clans. Dignitas was acquired by
  the Philadelphia 76ers in September 2016. The team is best known for its League of Legends, Rocket League, and Counter-Strike: 
  Global Offensive squads.
`
const TeamCard = (state) => {
    const team = getTeam(state.state.team_id)
    return (
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
            <CardContent>
                <Grid container
                    direction = "row"

                >
                <Grid item md = {8}>

                <Typography variant="body2" color="text.secondary" align = "left">
                    {team_description}
                </Typography>

                </Grid>
                <Grid item md = {4}>
                <PositionPie/>

                </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TeamCard
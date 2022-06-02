import React, { useEffect, useState, useContext } from 'react';
import { appContext } from './App';
import { TeamTimeline, MatchTimeline } from './Timeline'
import VersusContainer from './VersusContainer';
import TeamChooser from './TeamChooser';
import TeamCard from './TeamCard';
import { Grid } from '@mui/material';
const Content = () => {
  const context = useContext(appContext)
  const teamSelected = context.state.team_id !== "";
  const matchSelected = context.state.match_id !== "";
  const gameSelected = context.state.game_id !== "";
  // const content1 = (<div>Graphs about the Team</div>)

  return (
    <>
      <TeamChooser />
      <Grid container direction = "row">
        <Grid item xs = {7}>
          {teamSelected && <TeamTimeline />}
        </Grid>
        <Grid item xs = {5}>
          {teamSelected && <TeamCard />}
        </Grid>
      </Grid>

      {matchSelected && <VersusContainer />}
      {matchSelected && <MatchTimeline />}
      {gameSelected && <div>BRAVO, VOUS AVEZ SELECTIONNÉ UNE GAME!</div>}
    </>
  )
}

export default Content
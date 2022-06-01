import React, { useEffect, useState, useContext } from 'react';
import { appContext } from './App';
import {TeamTimeline, MatchTimeline} from './Timeline'
import VersusContainer from './VersusContainer';
import TeamChooser from './TeamChooser';
import TeamCard from './TeamCard';
const Content = () => {
  const context = useContext(appContext)
  const teamSelected = context.state.team_id !== "";
  const matchSelected = context.state.match_id !== "";
  const gameSelected = context.state.game_id !== "";
  // const content1 = (<div>Graphs about the Team</div>)
  
  return (
    <>
      <TeamChooser/>
      {teamSelected && <TeamTimeline />}
      {teamSelected && <TeamCard/>}
      {matchSelected && <VersusContainer/>}
      {matchSelected && <MatchTimeline />}
      {gameSelected && <div>BRAVO, VOUS AVEZ SELECTIONNÉ UNE GAME!</div>}
    </>
  )
}

export default Content
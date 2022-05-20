import React from 'react'
import {TeamTimeline, MatchTimeline} from './Timeline'
import VersusContainer from './VersusContainer';
import TeamChooser from './TeamChooser';

const Content = ({state}) => {
  const teamSelected = state.team_id !== "";
  const matchSelected = state.match_id !== "";
  const gameSelected = state.game_id !== "";
  const content1 = (<div>Graphs about the Team</div>)
  
  return (
    <>
      <TeamChooser state={state}/>
      {teamSelected && <TeamTimeline state={state}/>}
      {teamSelected && content1}
      {matchSelected && <VersusContainer state={state}/>}
      {matchSelected && <MatchTimeline state={state}/>}
      {gameSelected && <div>BRAVO, VOUS AVEZ SELECTIONNÉ UNE GAME!</div>}
    </>
  )
}

export default Content
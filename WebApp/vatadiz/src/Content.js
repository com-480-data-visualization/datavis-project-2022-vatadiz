import React from 'react'
import Timeline from './Timeline'
import VersusContainer from './VersusContainer';
import wmajor from "./data/winter_major_data_v2.json"

const Content = ({state}) => {
  const teamSelected = state.team_id !== "";
  const matchSelected = state.match_id !== "";
  const gameSelected = state.game_id !== "";
  const content1 = (<div>Graphs about the Team</div>)
  
  return (
    <>
      {teamSelected && <Timeline state={state}/>}
      {teamSelected && content1}
      {matchSelected && <VersusContainer state={state}/>}
    </>
  )
}

export default Content
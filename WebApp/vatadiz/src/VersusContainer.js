import React from 'react'
import "./VersusContainer.css"
import {getTeamMatch} from './ProcessedDataset'

function teamColumn(team){
    return (
        <div className="column" color={team.color}>
            <h2>{team.team_name}</h2>
            <p>{team.player1.player_tag}, {team.player2.player_tag}, {team.player3.player_tag}</p>
        </div>
    )
}
export default function VersusContainer({state}) {

    
    const match = getTeamMatch(state.team_id, state.match_id)

    return (
        <div>
            {/* <h2>{game.name}</h2> */}
            
            <div className="row">
                {teamColumn(match[match.selected_team])}
                {teamColumn(match[match.opposite_team])}
            </div>
        </div>

  )
}

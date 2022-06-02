import React, { useEffect, useState, useContext } from 'react';
import { appContext } from './App';
import "./VersusContainer.css"
import * as wmrlcs from './ProcessedDataset'

function teamColumn(team){
    return (
        <div className="column" color={team.color}>
            <h2>{team.team_name}</h2>
            <p>{team.player1.player_tag}, {team.player2.player_tag}, {team.player3.player_tag}</p>
        </div>
    )
}
export default function VersusContainer() {
    const context = useContext(appContext)
    const match = wmrlcs.getMatch(context.state.match_id)

    return (
        <div>
            {/* <h2>{game.name}</h2> */}
            
            <div className="row">
                {teamColumn(match[match[context.state.team_id]])}
                {teamColumn(wmrlcs.getOppositeTeamInfo(match, context.state.team_id))}
            </div>
        </div>

  )
}

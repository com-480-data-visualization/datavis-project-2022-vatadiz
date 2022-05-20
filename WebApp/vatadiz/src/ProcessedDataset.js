import wmajor from "./data/winter_major_data_v2.json"

export var teamsMinimalist = wmajor.teams.map(
    x => { var a = {};
        a["team_id"] = x.team_id; 
        a["team_name"] = x.team_name
        return a
});

export function getTeam(team_id) {
    var i = 0;
    while (i < teamsMinimalist.length && teamsMinimalist[i].team_id !== team_id) i++;
    if (i < teamsMinimalist.length)
        return wmajor.teams[i];
    else{
        console.log("THIS TEAM ID DOES NOT EXIST");
        return undefined;
    }
}

export function getMatch(matches, match_id) {
    var i = 0;
    while (i < matches.length && matches[i].match_id !== match_id) i++;
    if (i < matches.length)
        return matches[i];
    else{
        console.log("THIS MATCH ID DOES NOT EXIST");
        return undefined;
    }
}

export function getGame(games, game_id) {
    var i = 0;
    while (i < games.length && games[i].game_id !== game_id) i++;
    if (i < games.length)
        return games[i];
    else{
        console.log("THIS GAME ID DOES NOT EXIST");
        return undefined;
    }
}

export function getTeamMatch(team_id, match_id){
    return getMatch(getTeam(team_id).matches, match_id);
}

export function getTeamGame(team_id, game_id){
    return getGame(getTeam(team_id).games, game_id);
}

export function computeMatchMetric(match, selected_team){
    return match[selected_team].positioning_time_in_front_ball;
}

export function computeGameMetric(game, selected_team){
    return game[selected_team].positioning_time_in_front_ball;
}



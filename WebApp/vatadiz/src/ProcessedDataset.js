import wmajor from "./data/winter_major_data_v3.json"

const objectMap2Map = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )
  

const rankings = {
    "6020bc70f1e4807cc70023fb": 911,
    "6020c2b7f1e4807cc702ac15": 1002,
    "60b63cfdfec4a0857e7ba00c": 820,
    "605aca6853a71a78eacbc155": 740,
    "6020c1cdf1e4807cc7025d03": 681,
    "6020bc70f1e4807cc70023a0": 951,
    "6065dbab45122f213019c81f": 862,
    "6020bc70f1e4807cc70023d9": 630,
    "6020bc70f1e4807cc70023a5": 801,
    "6020bc9bf1e4807cc70041b4": 590,
    "6020bd98f1e4807cc700dc74": 721,
    "6020bcd5f1e4807cc7006767": 871,
    "6020bc70f1e4807cc70023e9": 750,
    "6020bc70f1e4807cc7002389": 630,
    "6020c1bef1e4807cc70258d0": 860
}

export var teamsMinimalist = Object.values(wmajor.teams).map((v, k) => { 
    return {team_id: v.team_id, team_name: v.team_name, team_region: v.team_region, team_score: rankings[v.team_id]}
});

export function getTeam(team_id) {
    return wmajor.teams[team_id]
}

export function getMatch(match_id) {
    return wmajor.matches[match_id]
}

export function getMatches(match_ids) {
    return match_ids.map(mid => wmajor.matches[mid])
}

export function getTeamMatches(team_id) {
    return wmajor.teams[team_id].matches.map(gid => wmajor.matches[gid])
}

export function getGame(game_id) {
    return wmajor.game[game_id]
}

export function getGames(game_ids) {
    return game_ids.map(gid => wmajor.games[gid])
}

export function getMatchGames(match_id) {
    return wmajor.matches[match_id].games.map(gid => wmajor.games[gid])
}

export function getTeamGames(team_id) {
    return wmajor.teams[team_id].games.map(gid => wmajor.games[gid])
}

export function getOppositeTeamID(event, team_id){
    const tn = event[team_id]
    if (tn[tn.length - 1] == 1)
        return event.team2.team_id
    else
        return event.team1.team_id
}

export function getOppositeTeamInfo(event, team_id){
    const tn = event[team_id]
    if (tn[tn.length - 1] == 1)
        return event.team2
    else
        return event.team1
}


export function computeTeamMetric(team_id){
    const team_stats = wmajor.teams[team_id].game_stats_average
    return team_stats.positioning_time_in_front_ball_normalized;
}

export function computeTeamMatchMetric(match, team_id){
    const team_match_info = match[match[team_id]]
    return team_match_info.positioning_time_in_front_ball_normalized;
}

export function computeTeamGameMetric(game, team_id){
    const team_game_info = game[game[team_id]]
    return team_game_info.positioning_time_in_front_ball_normalized;
}


export function getTeamLogo(team_id){
    const team_name = wmajor.teams[team_id].team_name;
    return require("" + `./data/team_logos/${team_name.replace(" ", "_").toLowerCase()}.png`);
}

export function getTeamIcon(team_id){
    const team_name = wmajor.teams[team_id].team_name;
    return require("" + `./data/team_logos/${team_name.replace(" ", "_").toLowerCase()}_icon.png`);
}

export function getOppositeTeamLogo(event, team_id){
    return getTeamLogo(getOppositeTeamID(event, team_id)); 
}

export function getOppositeTeamIcon(event, team_id){
    return getTeamIcon(getOppositeTeamID(event, team_id)); 
}
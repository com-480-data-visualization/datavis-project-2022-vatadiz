import wmajor from "./data/winter_major_data_v3.json"

const objectMap2Map = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

function filterObject(obj, callback) {
    return Object.fromEntries(Object.entries(obj).
        filter(([key, val]) => callback(key, val)));
}
export var teamsMinimalist = Object.values(wmajor.teams).map((v, k) => { 
    return {team_id: v.team_id, team_name: v.team_name, team_region: v.team_region}
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

export function getTeamNormalizedStats(team_id, event){
    var team_stats = {};
    if (event === undefined)
        team_stats = wmajor.teams[team_id].game_stats_average;
    else
        team_stats = event[event[team_id]];
        
    team_stats = filterObject(team_stats, (k,v) => JSON.stringify(k).includes("_normalized"))
    return team_stats;
}

export function getTeamLogo(team_id){
    const team_name = wmajor.teams[team_id].team_name;
    return require("" + `./data/team_logos/${team_name.replaceAll(" ", "_").toLowerCase()}.png`);
}

export function getTeamIcon(team_id){
    const team_name = wmajor.teams[team_id].team_name;
    return require("" + `./data/team_logos/${team_name.replaceAll(" ", "_").toLowerCase()}_icon.png`);
}

export function getOppositeTeamLogo(event, team_id){
    return getTeamLogo(getOppositeTeamID(event, team_id)); 
}

export function getOppositeTeamIcon(event, team_id){
    return getTeamIcon(getOppositeTeamID(event, team_id)); 
}
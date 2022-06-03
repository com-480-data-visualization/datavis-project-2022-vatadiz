const text_content = `
### Context
Rocket League is a widely known multiplayer-competitive-sport video game developed by Psyonix. Two teams are opposed in a game of soccer played with rocket-powered acrobatic cars for a minimum of 5 minutes. Players control their car’s rigid body to interact physically with the ball and attempt scoring. They manifest their playstyle through the mastery of tricks such as jumps, flips, rotations, drifts, and rocket propulsion. The team that scores the most wins a single game. In case of a tie after 5 minutes, both teams play indefinitely until one of them scores. In competitive play, each team is composed of 3 players and the victory of a single match follows the format of Best-Of (BO) 3/5/7 games (first team to win 2/3/4 games in total). Strategy can evolve during the rounds, and across rounds. During a Championship, the first phase is a round-robin qualification where each team plays against several other teams to get points and be qualified for the next phase. The second phase is a regular bracket championship where each loss is eliminatory.

### Problems

The goal of the project is to visualize how players change their play behavior knowing the seasonal factors. Specifically, we would like to picture whether they tempt to play more or less aggressively/risky depending on:

* Are they the favorite team? I.e, in the current analyzed local championship, will the team with the lowest ranking will take more or less risk to contest the favorite team?
* Are they winning the Best-of? I.e, let's take for example a B-O 5 where team A has won 2 of the 3 rounds it needs to win to be qualified. Will team A play more defensively in order to keep their advance, or will they try to continue to pressure the opposing team?
* Is there a global difference in risk-taking knowing that it is the championship’s first or second phase? I.e, if the loss is eliminatory, will the players change the way they play to adjust to the stakes?

Using this 3-axes analysis (what is more natural for a 3-D game!), the goal is to have a comprehension of how each team adapts to the situation during the championships. Even though the project focuses on Rocket League, the same analysis may be carried out on other team sports. An interesting follow-up would be to compare the obtained results with other “ball” sports, such as Soccer, Hockey, or Volley-Ball for example.
### The viz 
Now that you know the context, please explore this visualisation to discover how player's agressiveness change during the games !
`
export default text_content
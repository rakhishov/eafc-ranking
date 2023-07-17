export default function elo(elo1: number, elo2: number, score1: number, score2: number){
    const gameResult: string = score1 > score2 ? 'home' : score1 < score2 ? 'away' : 'draw'
    const expectedScore1 = 1 / (1 + Math.pow(10, (elo2 - elo1) / 400))
    const expectedScore2 = 1 / (1 + Math.pow(10, (elo1 - elo2) / 400))
    if(gameResult === 'home') return [Math.round(elo1 + 32 * (1 - expectedScore1)), Math.round(elo2 + 32 * (0 - expectedScore2))]
    else if(gameResult === 'away') return [Math.round(elo1 + 32 * (0 - expectedScore1)), Math.round(elo2 + 32 * (1 - expectedScore2))]
    else if(gameResult === 'draw') return [Math.round(elo1 + 32 * (0.5 - expectedScore1)), Math.round(elo2 + 32 * (0.5 - expectedScore2))]
}
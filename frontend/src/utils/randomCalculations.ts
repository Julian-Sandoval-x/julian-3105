import type { Snail } from '../types';
import { Snails } from '../data/db';

function randomWinners(numberOfWinners: number): Snail[] {
    
    const currentSnails = Snails.map(snail => ({...snail, victoryPoints: 0}));

    for (let i = 0; i < numberOfWinners; i++) {
        const randomIndex = Math.floor(Math.random() * currentSnails.length);
        currentSnails[randomIndex].victoryPoints += 1;
    }
    
    return currentSnails;

}

function randomBets(): number  {
    return Math.floor(Math.random() * 100) + 1;
}

export { randomBets, randomWinners };
import { describe, it, expect } from 'vitest';
import { randomWinners, randomBets } from '../src/utils/randomCalculations';

describe('Simulacion de Carreras SnailBet', () => {
    it('Debe devolver exactamente 6 caracoles con puntos de victoria', () => {
        const result = randomWinners(6);
        expect(result.length).toBe(6);
    })

    it('La suma de los puntos de victoria debe ser igual al número de ganadores', () => {
        const result = randomWinners(6);
        const totalVictoryPoints = result.reduce((sum, snail) => sum + snail.victoryPoints, 0);
        expect(totalVictoryPoints).toBe(6);
    })

    it('Ningún caracol debe tener puntos de victoria negativos', () => {
        const result = randomWinners(6);
        const hasNegativePoints = result.some(snail => snail.victoryPoints < 0);
        expect(hasNegativePoints).toBe(false);
    })

    it('Debe devolver un número aleatorio entre 1 y 100 para las apuestas', () => {
        const bet = randomBets();
        expect(bet).toBeGreaterThanOrEqual(1);
        expect(bet).toBeLessThanOrEqual(100);
    })

    
})
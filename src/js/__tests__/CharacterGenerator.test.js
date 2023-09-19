import { Bowman } from '../characters/Bowman.js';
import { Vampire } from '../characters/Vampire.js';
import { Swordsman } from '../characters/Swordsman.js';
import { Magician } from '../characters/Magician.js';

import { characterGenerator } from '../generators.js';
import { generateTeam } from '../generators.js';

import PositionedCharacter from '../PositionedCharacter.js';

test('Character generator', () => {
    const playerGenerator = characterGenerator([Vampire, Bowman], 10);
    const characterList = [];
    for (let i = 0; i < 10; i++) {
        characterList.push(playerGenerator.next())
    }

    expect(characterList.length).toBe(10);
});

test('Team generator', () => {
    const teamLen = 10;
    const maxLevel = 4;
    const team = generateTeam([Vampire, Bowman, Swordsman], maxLevel, teamLen);
    expect(team.characters.length).toBe(teamLen);
});

test('Team max level', () => {
    const teamLen = 4;
    const maxLevel = 3;
    const playerTypes = [Bowman, Swordsman, Magician]; // доступные классы игрока
    const team = generateTeam(playerTypes, maxLevel, teamLen); // массив из 4 случайных персонажей playerTypes с уровнем 1, 2 или 3

    expect(team.characters[0].level).not.toBe(maxLevel + 1);
});

test('Positioned character', () => {
    const character = new Bowman(2);
    const position = 8; // для поля 8x8 лучник будет находиться слева на второй строке
    const positionedCharacter = new PositionedCharacter(character, position); 

    expect(team.characters[0].level).not.toBe(maxLevel + 1);
});




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

// Проверьте, выдаёт ли генератор characterGenerator бесконечно новые персонажи из списка (учёт аргумента allowedTypes)
test('Character generator _ valid classes', () => {
    expect(() => {
        const playerClasses = [Vampire, Bowman];
        const playerGenerator = characterGenerator(playerClasses, 10);
        const characterList = [];
        for (let i = 0; i < 10; i++) {
            characterList.push(playerGenerator.next().value)
        }
        characterList.forEach(character => {
            if (!playerClasses.includes(character.constructor)) {
                throw new Error('This class is not allowed');
            }
        });
    
    }
    ).not.toThrow('This class is not allowed');
});
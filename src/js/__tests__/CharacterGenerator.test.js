import { Bowman } from '../characters/Bowman.js';
import { Vampire } from '../characters/Vampire.js';

import { characterGenerator } from '../generators.js';



test('Character generator', () => {
    const playerGenerator = characterGenerator([Vampire, Bowman], 10);
    const characterList = [];
    for (let i = 0; i < 10; i++) {
        characterList.push(playerGenerator.next())
    }

    console.log(characterList);

    expect(characterList.length).toBe(10);
});

test('Bowman success', () => {
    const bowman = new Bowman(1);
    console.log(bowman)
    expect(bowman instanceof Bowman).toBe(true);
});


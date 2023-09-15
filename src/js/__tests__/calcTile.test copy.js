import Character from '../Character.js';
import { Bowman } from '../characters/Bowman.js';
import { Swordsman } from '../characters/Swordsman.js';
import { Magician } from '../characters/Magician.js';

// jest.mock('../http');

// beforeEach(() => {
//   jest.resetAllMocks();
// });

test('Character error', () => {
    const character = new Character();
    console.log(character)
    expect(1).toBe(1);
});

test('Bowman success', () => {
    const bowman = new Bowman();
    console.log(bowman)
    expect(bowman instanceof Bowman).toBe(true);
});


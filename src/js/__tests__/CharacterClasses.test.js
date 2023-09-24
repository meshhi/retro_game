import Character from "../Character.js";
import { Bowman } from "../characters/Bowman.js";
import { Swordsman } from "../characters/Swordsman.js";
import { Magician } from "../characters/Magician.js";
import { Undead } from "../characters/Undead.js";
import { Vampire } from "../characters/Vampire.js";
import { Daemon } from "../characters/Daemon.js";
// jest.mock('../http'); impo

// beforeEach(() => {
//   jest.resetAllMocks();
// });

test("Character error", () => {
    expect(() => new Character()).toThrow(TypeError);
});

test("Bowman success", () => {
    const bowman = new Bowman(1);
    console.log(bowman);
    expect(bowman instanceof Bowman).toBe(true);
});

test("Swordsman success", () => {
    const swordsman = new Swordsman(1);
    console.log(swordsman);
    expect(swordsman instanceof Swordsman).toBe(true);
});

test("Magician success", () => {
    const magician = new Magician(1);
    console.log(magician);
    expect(magician instanceof Magician).toBe(true);
});

test("Undead success", () => {
    const undead = new Undead(1);
    console.log(undead);
    expect(undead instanceof Undead).toBe(true);
});

test("Vampire success", () => {
    const vampire = new Vampire(1);
    console.log(vampire);
    expect(vampire instanceof Vampire).toBe(true);
});

test("Daemon success", () => {
    const daemon = new Daemon(1);
    console.log(daemon);
    expect(daemon instanceof Daemon).toBe(true);
});

test("Correct first level character", () => {
    const vampire = new Vampire(1);
    expect(vampire.level).toBe(1);
    // expect(vampire).toEqual({
    //     level: 1,
    //     attack: 25,
    //     defence: 25,
    //     health: 100,
    //     type: 'vampire'
    //   });
});

test("Correct third level character", () => {
    const vampire = new Vampire(3);
    let result = false;
    if (vampire.level === 3 && vampire.attack === 81 && vampire.defence === 81) { 
        result = true; 
    }
    expect(result).toBe(true);
});
import Character from "../Character.js";
import { Bowman } from "../characters/Bowman.js";
import { Swordsman } from "../characters/Swordsman.js";
import { Magician } from "../characters/Magician.js";
import { Undead } from "../characters/Undead.js";
import { Vampire } from "../characters/Vampire.js";
import { Daemon } from "../characters/Daemon.js";

test("Character error", () => {
    expect(() => new Character()).toThrow(TypeError);
});

test("Bowman success", () => {
    const bowman = new Bowman(1);
    expect(bowman instanceof Bowman).toBe(true);
});

test("Swordsman success", () => {
    const swordsman = new Swordsman(1);
    expect(swordsman instanceof Swordsman).toBe(true);
});

test("Magician success", () => {
    const magician = new Magician(1);
    expect(magician instanceof Magician).toBe(true);
});

test("Undead success", () => {
    const undead = new Undead(1);
    expect(undead instanceof Undead).toBe(true);
});

test("Vampire success", () => {
    const vampire = new Vampire(1);
    expect(vampire instanceof Vampire).toBe(true);
});

test("Daemon success", () => {
    const daemon = new Daemon(1);
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

test("Bowman speed", () => {
    const bowman = new Bowman(1);
    expect(bowman.speed).toBe(2);
});

test("Bowman attack range", () => {
    const bowman = new Bowman(1);
    expect(bowman.attackRange).toBe(2);
});

test("Swordsman ranges", () => {
    const swordsman = new Swordsman(1);
    expect(swordsman.speed).toBe(4);
});

test("Swordsman attack range", () => {
    const swordsman = new Swordsman(1);
    expect(swordsman.attackRange).toBe(1);
});

test("Magician ranges", () => {
    const magician = new Magician(1);
    expect(magician.speed).toBe(1);
});

test("Magician attack range", () => {
    const magician = new Magician(1);
    expect(magician.attackRange).toBe(4);
});

test("Undead ranges", () => {
    const undead = new Undead(1);
    expect(undead.speed).toBe(4);
});

test("Undead attack range", () => {
    const undead = new Undead(1);
    expect(undead.attackRange).toBe(1);
});

test("Vampire ranges", () => {
    const vampire = new Vampire(1);
    expect(vampire.speed).toBe(2);
});

test("Vampire attack range", () => {
    const vampire = new Vampire(1);
    expect(vampire.attackRange).toBe(2);
});

test("Daemon ranges", () => {
    const daemon = new Daemon(1);
    expect(daemon.speed).toBe(1);
});

test("Daemon attack range", () => {
    const daemon = new Daemon(1);
    expect(daemon.attackRange).toBe(4);
});
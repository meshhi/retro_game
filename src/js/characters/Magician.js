import Character from "../Character";

export class Magician extends Character {
    constructor(level, attack = 10, defence = 40, health = 100, type = "magician", isCopy = false) {
        super(level, type, attack, defence, health);
        this.speed = 1;
        this.attackRange = 4;
        if (isCopy) {
            this.attack = attack;
            this.defence = defence;
            this.health = health;
            this.level = level;
        }
    }
}
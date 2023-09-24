import Character from "../Character";

export class Vampire extends Character {
    constructor(level, attack = 25, defence = 25, health = 100, type = "vampire", isCopy = false) {
        super(level, type, attack, defence, health);
        this.speed = 2;
        this.attackRange = 2;
        if (isCopy) {
            this.attack = attack;
            this.defence = defence;
            this.health = health;
            this.level = level;
        }
    }
}
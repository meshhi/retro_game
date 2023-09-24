import Character from "../Character";

export class Daemon extends Character {
    constructor(level, attack = 40, defence = 10, health = 100, type = "daemon", isCopy = false) {
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
import Character from '../Character';

export class Undead extends Character {
    constructor(level, attack = 40, defence = 10, health = 100, type = 'undead', isCopy = false) {
        super(level, type, attack, defence, health);
        this.speed = 4;
        this.attackRange = 1;
        if (isCopy) {
            this.attack = attack;
            this.defence = defence;
            this.health = health;
            this.level = level;
        }
    }
}
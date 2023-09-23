import Character from '../Character';

export class Swordsman extends Character {
    constructor(level, attack = 400, defence = 10, health = 100, type = 'swordsman') {
        super(level, type, attack, defence, health);
        this.speed = 4;
        this.attackRange = 1;
    }
}
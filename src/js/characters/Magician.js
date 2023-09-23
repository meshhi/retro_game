import Character from '../Character';

export class Magician extends Character {
    constructor(level, attack = 10, defence = 40, health = 100, type = 'magician') {
        super(level, type, attack, defence, health);
        this.speed = 1;
        this.attackRange = 4;
    }
}
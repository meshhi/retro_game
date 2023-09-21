import Character from '../Character';

export class Magician extends Character {
    constructor(level, attack = 10, defence = 40, health = 100, type = 'magician') {
        super(level, type)
        this.attack = attack;
        this.defence = defence;
        this.health = health;
        this.speed = 1;
    }
}
import Character from '../Character';

export class Swordsman extends Character {
    constructor(level, attack = 40, defence = 10, health = 100, type = 'swordsman') {
        super(level, type)
        this.attack = attack;
        this.defence = defence;
        this.health = health;
        this.speed = 4;
    }
}
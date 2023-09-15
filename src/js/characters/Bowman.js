import Character from '../Character';

export class Bowman extends Character {
    constructor(level, attack = 25, defence = 25, health = 100, type = 'bowman') {
        super(level, type)
        this.attack = attack;
        this.defence = defence;
        this.health = health;
    }
}
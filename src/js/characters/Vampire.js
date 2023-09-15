import Character from '../Character';

export class Vampire extends Character {
    constructor(level, attack = 25, defence = 25, health = 100, type = 'vampire') {
        super(level, type)
        this.attack = attack;
        this.defence = defence;
        this.health = health;
    }
}
import Character from '../Character';

export class Daemon extends Character {
    constructor(level, attack = 10, defence = 10, health = 100, type = 'daemon') {
        super(level, type)
        this.attack = attack;
        this.defence = defence;
        this.health = health;
    }
}
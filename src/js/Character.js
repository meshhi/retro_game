/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type = "generic", attack, defence, health) {
    // TODO: выбросите исключение, если кто-то использует "new Character()"
    if (new.target.name == "Character") {
      throw new TypeError("Cannot construct Character instances directly");
    }
    this.level = 1;
    this.attack = attack;
    this.defence = defence;
    this.health = health;
    this.type = type;
    while(this.level < level) {
      this.updateLevel();
    }
  }

  updateLevel = () => {
    this.attack = Math.max(this.attack, this.attack * (80 + this.health) / 100);
    this.defence = Math.max(this.defence, this.defence * (80 + this.health) / 100);
    this.health = (this.health + 100) > 100 ? 100 : this.health + 100;
    this.level += 1;
  };
}

import Team from "./Team";

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  while (true) {
    let index = Math.floor(Math.random() * allowedTypes.length);
    let currentType = allowedTypes[index];
    let currentInstance = new currentType(Math.floor(Math.random() * (maxLevel - 1) + 1));
    yield currentInstance;
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const characters = [];
  const playerGenerator = new characterGenerator(allowedTypes, maxLevel);
  for (let i = 0; i < characterCount; i++) {
    characters.push(playerGenerator.next().value);
  }
  return new Team(characters);
}

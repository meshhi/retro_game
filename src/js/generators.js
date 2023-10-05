import Team from "./Team";
import { Swordsman } from "./characters/Swordsman";
import { Magician } from "./characters/Magician";
import { Vampire } from "./characters/Vampire";
import { Undead } from "./characters/Undead";
import { Bowman } from "./characters/Bowman";
import { Daemon } from "./characters/Daemon";
import PositionedCharacter from "./PositionedCharacter";

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
export const generateTeam = (allowedTypes, maxLevel, characterCount) => {
  // TODO: write logic here
  const characters = [];
  const playerGenerator = new characterGenerator(allowedTypes, maxLevel);
  for (let i = 0; i < characterCount; i++) {
    characters.push(playerGenerator.next().value);
  }
  return new Team(characters);
}

export const generatePositionedTeams = (indexTeamA, indexTeamB) => {
  const teamA = generateTeam([Swordsman, Magician, Bowman], 4, 10).characters;
  const teamB = generateTeam([Undead, Vampire, Daemon], 4, 10).characters;
  const busyIndexes = [];
  const positionedTeamA = [];
  for (let item of teamA) {
    let currentIndex;
    currentIndex = indexTeamA[Math.floor(Math.random() * indexTeamA.length)];
    if (busyIndexes.includes(currentIndex)) {
        while(busyIndexes.includes(currentIndex)) {
          currentIndex = indexTeamA[Math.floor(Math.random() * indexTeamA.length)];
        }
    }
    busyIndexes.push(currentIndex);
    positionedTeamA.push(new PositionedCharacter(item, currentIndex));
  }
  const positionedTeamB = [];
  for (let item of teamB) {
    let currentIndex;
    currentIndex = indexTeamB[Math.floor(Math.random() * indexTeamB.length)];

    if (busyIndexes.includes(currentIndex)) {
      while(busyIndexes.includes(currentIndex)) {
        currentIndex = indexTeamB[Math.floor(Math.random() * indexTeamB.length)];

      }
    }
    busyIndexes.push(currentIndex);
    positionedTeamB.push(new PositionedCharacter(item, currentIndex));
  }
  return [positionedTeamA, positionedTeamB];
};
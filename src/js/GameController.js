import themes from './themes'
import { generateTeam } from './generators';

import { Bowman } from './characters/Bowman.js';
import { Magician } from './characters/Magician.js';
import { Swordsman } from './characters/Swordsman.js';
import { Daemon } from './characters/Daemon.js';

import PositionedCharacter from './PositionedCharacter';
import { generateMatrix } from './utils';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  initNewGame = () => {
    const getTeamIndixes = () => {
      const matrix = generateMatrix(this.gamePlay.boardSize);
      const leftColumns = [this.gamePlay.boardSize - this.gamePlay.boardSize, this.gamePlay.boardSize - this.gamePlay.boardSize + 1]
      const rightColumns = [this.gamePlay.boardSize - 2, this.gamePlay.boardSize - 1]
      const leftIndexes = []
      const rightIndexes = []
      for (let [index, item] of Object.entries(matrix)) {
        if (leftColumns.includes(item[1])) {
          leftIndexes.push(Number(index))
        }

        if (rightColumns.includes(item[1])) {
          rightIndexes.push(Number(index))
        }
      }
      return [leftIndexes, rightIndexes]
    }
    const [indexTeamA, indexTeamB] = getTeamIndixes();

    const generatePositionedTeams = () => {
      const teamA = generateTeam([Bowman, Magician], 4, 5).characters;
      const teamB = generateTeam([Swordsman, Daemon], 4, 5).characters;

      const positionedTeamA = [];
      for (let item of teamA) {
        let currentIndex = indexTeamA[Math.floor(Math.random() * indexTeamA.length)];
        positionedTeamA.push(new PositionedCharacter(item, currentIndex))
      }

      const positionedTeamB = [];
      for (let item of teamB) {
        let currentIndex = indexTeamB[Math.floor(Math.random() * indexTeamB.length)];
        positionedTeamB.push(new PositionedCharacter(item, currentIndex))
      }

      return [positionedTeamA, positionedTeamB];
    }
    const [teamA, teamB] = generatePositionedTeams();

    this.stateService.teams = [teamA, teamB];
    this.gamePlay.redrawPositions([...teamA, ...teamB]);
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.initNewGame();
    this.gamePlay.addNewGameListener(this.initNewGame);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}

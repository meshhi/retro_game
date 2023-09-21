import themes from './themes'
import { generateTeam } from './generators';

import { Bowman } from './characters/Bowman.js';
import { Magician } from './characters/Magician.js';
import { Swordsman } from './characters/Swordsman.js';
import { Daemon } from './characters/Daemon.js';
import { Undead } from './characters/Undead.js';
import { Vampire } from './characters/Vampire.js';

import PositionedCharacter from './PositionedCharacter';
import { generateMatrix, getCharacteristics, determineValidMoves } from './utils';
import GamePlay from './GamePlay';

import cursors from './cursors.js';


export default class GameController {
  constructor(gamePlay, stateService, state) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = this.stateService.state;
    this.boardMatrix = generateMatrix(this.gamePlay.boardSize);
  }

  initNewGame = () => {
    const getTeamIndixes = () => {
      const matrix = this.boardMatrix;
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
      const teamA = generateTeam([Bowman, Magician, Swordsman], 4, 10).characters;
      const teamB = generateTeam([Daemon, Undead, Vampire], 4, 10).characters;
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
        positionedTeamA.push(new PositionedCharacter(item, currentIndex))
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
        positionedTeamB.push(new PositionedCharacter(item, currentIndex))
      }
      
      return [positionedTeamA, positionedTeamB];
    }
    const [teamA, teamB] = generatePositionedTeams();

    this.state.teams = {
      '1': teamA,
      '2': teamB
    };
    this.state.currentTurn.player = 0;
    this.state.currentTurn.status = "select";
    this.gamePlay.redrawPositions([...teamA, ...teamB]);
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.initNewGame();
    this.gamePlay.addNewGameListener(this.initNewGame);
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  onCellClick = (index) => {
    // TODO: react to click
    const currentCellCharacter = [...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === index);
    if (this.state.currentTurn.status === "select") {
      if (currentCellCharacter) {
        if (this.state.currentTurn.player == 0) {
          if (this.state.selectedIndex) {
            this.gamePlay.deselectCell(this.state.selectedIndex);
          }
          if (this.state.teams["1"].includes(currentCellCharacter)) {
            this.gamePlay.selectCell(index);
            this.state.selectedIndex = index;
            this.state.currentTurn.status = "action"
          }
        }
        if (this.state.currentTurn.player == 1) {
          if (this.state.teams["2"].includes(currentCellCharacter)) {
            this.gamePlay.selectCell(index);
            this.state.selectedIndex = index;
            this.state.currentTurn.status = "action"
          }
        }
      } else {
        // GamePlay.showError('No character selected');
        console.log('No character selected');
      }
    }

    if (this.state.currentTurn.status === "action") {
      if (currentCellCharacter) {
        if (this.state.currentTurn.player == 0) {
          if (this.state.selectedIndex) {
            this.gamePlay.deselectCell(this.state.selectedIndex);
          }
          if (this.state.teams["1"].includes(currentCellCharacter)) {
            this.gamePlay.selectCell(index);
            this.state.selectedIndex = index;
            this.state.currentTurn.status = "action"
          }
        }
        if (this.state.currentTurn.player == 1) {
          if (this.state.teams["2"].includes(currentCellCharacter)) {
            this.gamePlay.selectCell(index);
            this.state.selectedIndex = index;
            this.state.currentTurn.status = "action"
          }
        }
      } else {
        // GamePlay.showError('No character selected');
        console.log('No character selected');
      }
    }
  }

  onCellEnter = (index) => {
    // TODO: react to mouse enter
    if (this.state.currentTurn.status === "action") {
      if (this.state.selectedIndex !== index) {
        this.gamePlay.setCurrentCellStyle(index, 'go');
        this.gamePlay.setCursor(cursors.pointer);
      }
      const hoverCharacter = [...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === index);
      if (hoverCharacter) {
        let currentCharacterTeam = 0;
        if (this.state.teams["1"].includes(hoverCharacter)) {
          currentCharacterTeam = 0;
        }
        if (this.state.teams["2"].includes(hoverCharacter)) {
          currentCharacterTeam = 1;
        }
        if (this.state.currentTurn.player == currentCharacterTeam) {
          // this.gamePlay.setCurrentCellStyle(index, 'can_select');
          this.gamePlay.setCursor(cursors.pointer);
        }
        if (this.state.currentTurn.player !== currentCharacterTeam) {
          this.gamePlay.setCurrentCellStyle(index, 'attack');
          this.gamePlay.setCursor(cursors.crosshair);
        }
        if ((this.state.selectedIndex !== index) && (this.state.currentTurn.player === currentCharacterTeam)) {
          this.gamePlay.removeCurrentCellStyle(index);
        }
      }
      const currentCellMove = determineValidMoves([...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === this.state.selectedIndex), index, this.boardMatrix);
      if (!currentCellMove) {
        this.gamePlay.setCursor(cursors.notallowed);
      }
      
      // this.gamePlay.showCellTooltip(getCharacteristics(currentCellCharacter), index);
    }
    const currentCellCharacter = [...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === index);
    if (currentCellCharacter) {
      this.gamePlay.showCellTooltip(getCharacteristics(currentCellCharacter), index);
    }
  }

  onCellLeave = (index) => {
    // TODO: react to mouse leave
    if (this.state.currentTurn.status === "action") {
      this.gamePlay.setCursor(cursors.auto);
      if (this.state.selectedIndex !== index) {
        // this.gamePlay.removeCurrentCellStyle(index, 'go');
      }
      // this.gamePlay.showCellTooltip(getCharacteristics(currentCellCharacter), index);
    }
    this.gamePlay.hideCellTooltip(index);
  }
}

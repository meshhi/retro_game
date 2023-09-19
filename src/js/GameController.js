import themes from './themes'
import { generateTeam } from './generators';

import { Bowman } from './characters/Bowman.js';
import { Magician } from './characters/Magician.js';
import { Swordsman } from './characters/Swordsman.js';
import { Daemon } from './characters/Daemon.js';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie)
    
    this.gamePlay.addNewGameListener(() => {
      const teamA = generateTeam([Bowman, Magician], 4, 5);
      const teamB = generateTeam([Swordsman, Daemon], 4, 5);

      this.stateService.teams = [teamA, teamB];
      // this.gamePlay.redrawPositions()
      console.log(this.stateService.teams)
    })
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

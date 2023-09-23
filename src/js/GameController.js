import themes from './themes'
import { generateTeam } from './generators';

import { Bowman } from './characters/Bowman.js';
import { Magician } from './characters/Magician.js';
import { Swordsman } from './characters/Swordsman.js';
import { Daemon } from './characters/Daemon.js';
import { Undead } from './characters/Undead.js';
import { Vampire } from './characters/Vampire.js';

import PositionedCharacter from './PositionedCharacter';
import { generateMatrix, getCharacteristics, determineValidMoves, determineValidAttacks, determineCharacterTeam } from './utils';
import GamePlay from './GamePlay';
import GameState from './GameState';

import cursors from './cursors.js';


export default class GameController {
  constructor(gamePlay, stateService, bot) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = this.stateService.state;
    this.state.themes = {};
    this.boardMatrix = generateMatrix(this.gamePlay.boardSize);
    this.bot = bot;
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
      const teamA = generateTeam([Swordsman, Magician, Bowman], 4, 5).characters;
      const teamB = generateTeam([Undead, Vampire, Daemon], 4, 2).characters;
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
    this.gamePlay.removeCurrentCellStyle(this.state.selectedIndex);
    this.state.selectedIndex = null;
    this.gamePlay.redrawPositions([...this.state.teams['1'].filter(item => item.character.health > 0), ...this.state.teams['2'].filter(item => item.character.health > 0)]);
    // update UI theme
    for (let item of this.state.themes.list) {
      try {
        this.gamePlay.boardEl.classList.remove(item);
      } catch (err) {}
    }
    this.gamePlay.boardEl.classList.add(this.state.themes.list[0]);
    if (this.gamePlay.boardEl.style.pointerEvents === "none") {
      this.gamePlay.boardEl.style.pointerEvents = "auto";
    }
  }

  upgradeGameLevel = () => {
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

    const updateStartPositions = () => {
      const generatePositionedTeams = () => {
        const teamA = generateTeam([Swordsman, Magician, Bowman], 4, 5).characters;
        const teamB = generateTeam([Undead, Vampire, Daemon], 4, 2).characters;
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
      
      const teamA = this.state.teams['1'];
      const teamB = generatePositionedTeams()[1];
      const busyIndexes = [];

      for (let item of teamA) {
        let currentIndex;
        currentIndex = indexTeamA[Math.floor(Math.random() * indexTeamA.length)];
        if (busyIndexes.includes(currentIndex)) {
            while(busyIndexes.includes(currentIndex)) {
              currentIndex = indexTeamA[Math.floor(Math.random() * indexTeamA.length)];
            }
        }
        busyIndexes.push(currentIndex);
        item.position = currentIndex;
        if (item.character.health > 0) {
          item.character.updateLevel();
        }
        if (item.character.health <= 0) {
          item.position = -1;
        }
      }

      for (let item of teamB) {
        let currentIndex;
        currentIndex = indexTeamB[Math.floor(Math.random() * indexTeamB.length)];

        if (busyIndexes.includes(currentIndex)) {
          while(busyIndexes.includes(currentIndex)) {
            currentIndex = indexTeamB[Math.floor(Math.random() * indexTeamB.length)];
          }
        }
        busyIndexes.push(currentIndex);
        item.position = currentIndex;
        if (item.character.health > 0) {
          item.character.updateLevel();
        }
      }
      this.state.teams['2'] = teamB;
    }
    updateStartPositions();

    // update UI theme
    this.gamePlay.boardEl.classList.remove(this.state.themes.list[this.state.themes.current]);
    this.state.themes.current += 1;
    if (this.state.themes.current === 4) {
      this.state.themes.current = 0;
    }
    this.gamePlay.boardEl.classList.add(this.state.themes.list[this.state.themes.current]);

    this.state.currentTurn.player = 0;
    this.state.currentTurn.status = "select";
    this.gamePlay.redrawPositions([...this.state.teams['1'].filter(item => item.character.health > 0), ...this.state.teams['2'].filter(item => item.character.health > 0)]); 
  
    GameState.gameStats.wins++;
    document.querySelector('.win').textContent = `Wins: ${GameState.gameStats.wins}`;
  }

  gameOver = () => {
    this.gamePlay.boardEl.style.pointerEvents = "none";
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.state.themes.list = [];
    for (let key in themes) {
      this.state.themes.list.push(key);
    }
    this.state.themes.current = 0;
    this.gamePlay.drawUi(this.state.themes.list[this.state.themes.current]);
    this.initNewGame();
    this.gamePlay.addNewGameListener(this.initNewGame);
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
    this.gamePlay.addSaveGameListener(this.saveGame);
    this.gamePlay.addLoadGameListener(this.loadGame);

    let winEl = document.createElement('div');
    winEl.style.color  = 'white';
    winEl.classList.add('win');
    winEl.textContent = `Wins: ${GameState.gameStats.wins}`
    document.querySelector('.controls').appendChild(winEl);
    
  }

  onCellClick = (index) => {
    // TODO: react to click
    const currentCellCharacter = [...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === index);
    let cellCharacterTeam = -1;
    if (currentCellCharacter) {
      cellCharacterTeam = determineCharacterTeam(this.state.teams["1"], this.state.teams["2"], currentCellCharacter);
    }
    if (this.state.currentTurn.status === "select") {      
      if (currentCellCharacter) {
        if (this.state.selectedIndex) {
          this.gamePlay.deselectCell(this.state.selectedIndex);
          this.state.selectedIndex = index;
        }
        if (this.state.currentTurn.player == 0 && cellCharacterTeam == 0) {
            this.gamePlay.selectCell(index);
            this.state.selectedIndex = index;
            this.state.currentTurn.status = "action"
        }
        if (this.state.currentTurn.player == 1 && cellCharacterTeam == 1) {
            this.gamePlay.selectCell(index);
            this.state.selectedIndex = index;
            this.state.currentTurn.status = "action"
        }
      } else {
        GamePlay.showError('No character selected');
      }
    }

    if (this.state.currentTurn.status === "action") {
      // move
      if (this.gamePlay.cells[index].classList.contains('selected-green')) {
        for (let teamNumber in this.state.teams) {
          for (let i = 0; i < this.state.teams[teamNumber].length; i++) {
            if (this.state.teams[teamNumber][i].position === this.state.selectedIndex) {
              this.state.teams[teamNumber][i].position = index;
            }
          }
        }
        this.state.currentTurn.status = 'select';
        this.state.currentTurn.player = this.state.currentTurn.player == 1 ? 0 : 1;
        this.gamePlay.deselectCell(this.state.selectedIndex);
        this.state.selectedIndex = null;
        this.gamePlay.redrawPositions([...this.state.teams['1'].filter(item => item.character.health > 0), ...this.state.teams['2'].filter(item => item.character.health > 0)]);

        if (this.state.currentTurn.player == 1) {
          if (this.state.currentTurn.status === "select") {
            console.log('bot after move')
            this.bot.makeMove(this.onCellClick, this.state, this.boardMatrix, this.onCellEnter, this.gamePlay.boardSize, this.onCellLeave);
            this.state.currentTurn.player = 0;
          }
        }
      }
      // attack
      if (this.gamePlay.cells[index].classList.contains('selected-red')) {
        let attack = 0;
        let defence = 0;
        let damage = 0; // Math.max(attacker.attack - target.defence, attacker.attack * 0.1)
        
        for (let teamNumber in this.state.teams) {
          for (let i = 0; i < this.state.teams[teamNumber].length; i++) {
            // selected character
            if (this.state.teams[teamNumber][i].position === this.state.selectedIndex) {
              attack = this.state.teams[teamNumber][i].character.attack;
            }
          }
        }

        for (let teamNumber in this.state.teams) {
          for (let i = 0; i < this.state.teams[teamNumber].length; i++) {
            // hovered character
            if (this.state.teams[teamNumber][i].position === index) {
              defence = this.state.teams[teamNumber][i].character.defence;
              damage = Math.max(attack - defence, attack * 0.1);
              this.state.teams[teamNumber][i].character.health -= damage;
              if (this.state.teams[teamNumber][i].character.health <= 0) {
                this.state.teams[teamNumber][i].position = -1;
              }
              break;
            }
          }
        }

        document.querySelector('body').style.pointerEvents = 'none';
        this.gamePlay.showDamage(index, damage)
          .then(res => {
            this.state.currentTurn.status = 'select';
            this.state.currentTurn.player = this.state.currentTurn.player == 1 ? 0 : 1;
            this.gamePlay.deselectCell(this.state.selectedIndex);
            this.state.selectedIndex = null;
            this.gamePlay.redrawPositions([...this.state.teams['1'].filter(item => item.character.health > 0), ...this.state.teams['2'].filter(item => item.character.health > 0)]);
            if ([...this.state.teams['2'].filter(item => item.character.health > 0)].length === 0) {
              this.upgradeGameLevel();
            }
            if ([...this.state.teams['1'].filter(item => item.character.health > 0)].length === 0) {
              this.gameOver();
            }
            document.querySelector('body').style.pointerEvents = 'auto';

            if (this.state.currentTurn.player == 1) {
              if (this.state.currentTurn.status === "select") {
                console.log('bot after attack')
                this.bot.makeMove(this.onCellClick, this.state, this.boardMatrix, this.onCellEnter, this.gamePlay.boardSize, this.onCellLeave);
                this.state.currentTurn.player = 0;
              }
            }
          });
      }
      // another character in team
      if (this.gamePlay.cells[index].classList.contains('friendly')) {
        this.gamePlay.deselectCell(this.state.selectedIndex);
        this.state.selectedIndex = index;
        this.gamePlay.selectCell(this.state.selectedIndex);
      }
      this.gamePlay.setCursor(cursors.auto);
    }
    this.gamePlay.hideCellTooltip(index);
  }

  onCellEnter = (index) => {
    // TODO: react to mouse enter
    if (this.state.currentTurn.status === "action") {
      if (this.state.selectedIndex !== index) {
        this.gamePlay.removeCurrentCellStyle(index);
      }
      this.gamePlay.setCursor(cursors.notallowed);
      const currentCellMove = determineValidMoves([...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === this.state.selectedIndex), index, this.boardMatrix);
      const currentCellAttack = determineValidAttacks([...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === this.state.selectedIndex), index, this.boardMatrix);
      const hoverCharacter = [...this.state.teams["1"], ...this.state.teams["2"]].find(item => item.position === index);
      if ((this.state.selectedIndex !== index) && !hoverCharacter && currentCellMove) {
        this.gamePlay.setCurrentCellStyle(index, 'go');
        this.gamePlay.setCursor(cursors.pointer);
      }
      if (hoverCharacter) {
        const currentCharacterTeam = determineCharacterTeam(this.state.teams["1"], this.state.teams["2"], hoverCharacter);
        if (this.state.currentTurn.player == currentCharacterTeam) {
          // if (hoverCharacter.position !== this.state.selectedIndex) {
            this.gamePlay.setCurrentCellStyle(index, 'friendly');
            this.gamePlay.setCursor(cursors.pointer);
          // }
        }
        if ((this.state.currentTurn.player !== currentCharacterTeam) && currentCellAttack) {
            this.gamePlay.setCurrentCellStyle(index, 'attack');
            this.gamePlay.setCursor(cursors.crosshair);
        }
      }
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
    }
    this.gamePlay.hideCellTooltip(index);
  }

  saveGame = () => {
    // TODO: save game
    this.stateService.save(this.state);
  }

  loadGame = () => {
    // TODO: load game
    this.state = this.stateService.load();
    for (let index in this.boardMatrix) {
      this.gamePlay.removeCurrentCellStyle(index);
    }
    if (this.state.selectedIndex) {
      this.gamePlay.selectCell(this.state.selectedIndex);
    }

    // update UI theme
    for (let item of this.state.themes.list) {
      try {
        this.gamePlay.boardEl.classList.remove(item);
      } catch (err) {}
    }
    this.gamePlay.boardEl.classList.add(this.state.themes.list[this.state.themes.current]);


    this.gamePlay.redrawPositions([...this.state.teams['1'].filter(item => item.character.health > 0), ...this.state.teams['2'].filter(item => item.character.health > 0)]);
  }
}

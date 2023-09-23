import { determineValidAttacks, determineValidMoves } from "./utils";

class Bot {
  constructor() {
  }

  makeMove(cellClick, state, boardMatrix, cellEnter, boardSize, cellLeave, removeCurrentCellStyle) {
    const charactersCoordinates = state.teams['2'].map(item => item.position);
    let randomIndexCharacter = Math.floor(Math.random() * charactersCoordinates.length);
    const character = state.teams['2'][randomIndexCharacter];
    const characterCoordinates = charactersCoordinates[randomIndexCharacter];
    cellEnter(characterCoordinates);
    cellClick(characterCoordinates); // выбрали персонажа
    
    let validMoveCoords = determineValidMoves(character, null, boardMatrix, true);
    validMoveCoords = validMoveCoords.filter(item => item[0] >= 0 && item[0] < boardSize && item[1] >=0 && item[1] < boardSize);
    let randomMoveCoordIndex = Math.floor(Math.random() * validMoveCoords.length);
    let randomMoveCoord = validMoveCoords[randomMoveCoordIndex]
    let randomMoveCoordPosition = randomMoveCoord[0] * (boardSize) + (randomMoveCoord[1]);
    while (characterCoordinates === randomMoveCoordPosition || randomMoveCoordPosition < 0) {
      randomMoveCoordIndex = Math.floor(Math.random() * validMoveCoords.length);
      randomMoveCoord = validMoveCoords[randomMoveCoordIndex]
      randomMoveCoordPosition = randomMoveCoord[0] * (boardSize) + (randomMoveCoord[1]);
    }

    let validAttackCoords = determineValidAttacks(character, null, boardMatrix, true);
    validAttackCoords = validAttackCoords.filter(item => item[0] >= 0 && item[0] < boardSize && item[1] >=0 && item[1] < boardSize);
    let randomAttackCoordIndex = Math.floor(Math.random() * validAttackCoords.length);
    let randomAttackCoord = validAttackCoords[randomAttackCoordIndex]
    let randomAttackCoordPosition = randomAttackCoord[0] * (boardSize) + (randomAttackCoord[1]);
    while (characterCoordinates === randomAttackCoordPosition || randomAttackCoordPosition < 0) {
      randomAttackCoordIndex = Math.floor(Math.random() * validAttackCoords.length);
      randomAttackCoord = validAttackCoords[randomAttackCoordIndex]
      randomAttackCoordPosition = randomAttackCoord[0] * (boardSize) + (randomAttackCoord[1]);
    }

    removeCurrentCellStyle(characterCoordinates);

    console.log(characterCoordinates);
    console.log(randomMoveCoordPosition);
    console.log(randomAttackCoordPosition);

    // cellEnter(randomMoveCoordPosition); // навели на подходящую для хода клетку
    // cellLeave(randomMoveCoordPosition); // сняли с подходящей клетки
    // removeCurrentCellStyle(randomMoveCoordPosition);
    cellClick(randomMoveCoordPosition); // сделали ход
    // cellLeave(characterCoordinates);
  }
}

export default Bot
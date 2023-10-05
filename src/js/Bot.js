import { determineValidAttacks, determineValidMoves } from "./utils";

class Bot {
  makeMove = async(cellClick, state, boardMatrix, cellEnter, boardSize, cellLeave, removeCurrentCellStyle, cells) =>{
    let randomIndexCharacter = Math.floor(Math.random() * state.teams["2"].length);
    let character = state.teams["2"][randomIndexCharacter];
    while(character.position == -1 || character.character.health <= 0) {
      randomIndexCharacter = Math.floor(Math.random() * state.teams["2"].length);
      character = state.teams["2"][randomIndexCharacter];
    }
    const characterCoordinates = character.position;
    cellEnter(characterCoordinates);
    await cellClick(characterCoordinates); // выбрали персонажа
    cellLeave(characterCoordinates);
    let validMoveCoords = determineValidMoves(character, null, boardMatrix, true);
    validMoveCoords = validMoveCoords.filter(item => item[0] >= 0 && item[0] < boardSize && item[1] >=0 && item[1] < boardSize);
    let randomMoveCoordIndex = Math.floor(Math.random() * validMoveCoords.length);
    let randomMoveCoord = validMoveCoords[randomMoveCoordIndex];
    let randomMoveCoordPosition = randomMoveCoord[0] * (boardSize) + (randomMoveCoord[1]);
    let characterCell = cells[randomMoveCoordPosition].children.length;
    while (characterCoordinates === randomMoveCoordPosition || randomMoveCoordPosition < 0 || characterCell) {
      randomMoveCoordIndex = Math.floor(Math.random() * validMoveCoords.length);
      randomMoveCoord = validMoveCoords[randomMoveCoordIndex];
      randomMoveCoordPosition = randomMoveCoord[0] * (boardSize) + (randomMoveCoord[1]);
      characterCell = cells[randomMoveCoordPosition].children.length;
    }
    let validAttackCoords = determineValidAttacks(character, null, boardMatrix, true);
    validAttackCoords = validAttackCoords.filter(item => item[0] >= 0 && item[0] < boardSize && item[1] >=0 && item[1] < boardSize);
    let randomAttackCoordIndex = Math.floor(Math.random() * validAttackCoords.length);
    let randomAttackCoord = validAttackCoords[randomAttackCoordIndex];
    let randomAttackCoordPosition = randomAttackCoord[0] * (boardSize) + (randomAttackCoord[1]);
    let characterCellAttack = cells[randomAttackCoordPosition].children.length;
    let enemyCharacterCell = cells[randomAttackCoordPosition].children[0] && (cells[randomAttackCoordPosition].children[0].classList.contains("swordsman") || cells[randomAttackCoordPosition].children[0].classList.contains("bowman") || cells[randomAttackCoordPosition].children[0].classList.contains("magician"));
    let counter = 0;
    let found = false;
    while (characterCoordinates === randomAttackCoordPosition || randomAttackCoordPosition < 0 || !characterCellAttack || !enemyCharacterCell) {
      found = false;
      randomAttackCoordIndex = Math.floor(Math.random() * validAttackCoords.length);
      randomAttackCoord = validAttackCoords[randomAttackCoordIndex];
      randomAttackCoordPosition = randomAttackCoord[0] * (boardSize) + (randomAttackCoord[1]);
      characterCellAttack = cells[randomAttackCoordPosition].children.length;
      enemyCharacterCell = cells[randomAttackCoordPosition].children[0] && (cells[randomAttackCoordPosition].children[0].classList.contains("swordsman") || cells[randomAttackCoordPosition].children[0].classList.contains("bowman") || cells[randomAttackCoordPosition].children[0].classList.contains("magician"));
      counter++;
      found = true;
      if (counter > validAttackCoords.length) {
        found = false;
        break;
      }
    }
    // attack
    if (found) {
      cellEnter(randomAttackCoordPosition);
      await cellClick(randomAttackCoordPosition); // выбрали персонажа
      cellLeave(randomAttackCoordPosition);
      removeCurrentCellStyle(randomAttackCoordPosition);
    } else {
      cellEnter(randomMoveCoordPosition);
      await cellClick(randomMoveCoordPosition); // выбрали персонажа
      cellLeave(randomMoveCoordPosition);
      removeCurrentCellStyle(randomMoveCoordPosition);
    }
  };
}

export default Bot;
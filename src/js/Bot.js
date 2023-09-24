import { determineValidAttacks, determineValidMoves } from "./utils";

class Bot {
  constructor() {
  }

  makeMove = async(cellClick, state, boardMatrix, cellEnter, boardSize, cellLeave, removeCurrentCellStyle, cells) =>{
    console.log('bot start')
    
    let randomIndexCharacter = Math.floor(Math.random() * state.teams['2'].length);
    let character = state.teams['2'][randomIndexCharacter];
    while(character.position == -1 || character.character.health <= 0) {
      randomIndexCharacter = Math.floor(Math.random() * state.teams['2'].length);
      character = state.teams['2'][randomIndexCharacter];
    }
    const characterCoordinates = character.position;

    cellEnter(characterCoordinates);
    await cellClick(characterCoordinates); // выбрали персонажа
    cellLeave(characterCoordinates);
    
    let validMoveCoords = determineValidMoves(character, null, boardMatrix, true);
    validMoveCoords = validMoveCoords.filter(item => item[0] >= 0 && item[0] < boardSize && item[1] >=0 && item[1] < boardSize);
    let randomMoveCoordIndex = Math.floor(Math.random() * validMoveCoords.length);
    let randomMoveCoord = validMoveCoords[randomMoveCoordIndex]
    let randomMoveCoordPosition = randomMoveCoord[0] * (boardSize) + (randomMoveCoord[1]);
    console.log('character coordinates: ')
    console.log(characterCoordinates)
    console.log(cells[characterCoordinates])
    console.log('move coordinates: ')
    console.log(randomMoveCoordPosition)
    console.log(cells[randomMoveCoordPosition])
    let characterCell = cells[randomMoveCoordPosition].children.length
    while (characterCoordinates === randomMoveCoordPosition || randomMoveCoordPosition < 0 || characterCell) {
      randomMoveCoordIndex = Math.floor(Math.random() * validMoveCoords.length);
      randomMoveCoord = validMoveCoords[randomMoveCoordIndex]
      randomMoveCoordPosition = randomMoveCoord[0] * (boardSize) + (randomMoveCoord[1]);
      characterCell = cells[randomMoveCoordPosition].children.length
      console.log(randomMoveCoordPosition)
      console.log(cells[randomMoveCoordPosition])
    }


    let validAttackCoords = determineValidAttacks(character, null, boardMatrix, true);
    validAttackCoords = validAttackCoords.filter(item => item[0] >= 0 && item[0] < boardSize && item[1] >=0 && item[1] < boardSize);
    let randomAttackCoordIndex = Math.floor(Math.random() * validAttackCoords.length);
    let randomAttackCoord = validAttackCoords[randomAttackCoordIndex]
    let randomAttackCoordPosition = randomAttackCoord[0] * (boardSize) + (randomAttackCoord[1]);
    // console.log('attack coordinates: ')
    // console.log(randomAttackCoordPosition)
    // console.log(cells[randomAttackCoordPosition])

    // let friendlyCharacterCell = cells[randomMoveCoordPosition].children[0] && (cells[randomMoveCoordPosition].children[0].classList.contains('daemon') || cells[randomMoveCoordPosition].children[0].classList.contains('vampire') || cells[randomMoveCoordPosition].children[0].classList.contains('undead'))

    while (characterCoordinates === randomAttackCoordPosition || randomAttackCoordPosition < 0) {
      randomAttackCoordIndex = Math.floor(Math.random() * validAttackCoords.length);
      randomAttackCoord = validAttackCoords[randomAttackCoordIndex]
      randomAttackCoordPosition = randomAttackCoord[0] * (boardSize) + (randomAttackCoord[1]);
      // console.log(randomAttackCoordPosition)
      // console.log(cells[randomAttackCoordPosition])
    }

    cellEnter(randomMoveCoordPosition);
    await cellClick(randomMoveCoordPosition); // выбрали персонажа
    cellLeave(randomMoveCoordPosition);
    removeCurrentCellStyle(randomMoveCoordPosition)

    console.log('character coordinates: ', characterCoordinates)
    console.log('randomAttackCoordPosition: ', randomAttackCoordPosition)

    console.log('bot end')
  }
}

export default Bot
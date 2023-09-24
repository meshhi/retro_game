/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  // TODO: ваш код будет тут
  const matrix = generateMatrix(boardSize);
  let [x, y] = matrix[index];
  if ((x == 0) && (y == 0)) {
    return "top-left";
  }
  if ((x == 0) && (y == (boardSize - 1))) {
    return "top-right";
  }
  if ((x == (boardSize - 1)) && (y == 0)) {
    return "bottom-left";
  }
  if ((x == (boardSize - 1)) && (y == (boardSize - 1))) {
    return "bottom-right";
  }
  if (x == (boardSize - 1)) {
    return "bottom";
  }
  if (x == 0) {
    return "top";
  }
  if (y == (boardSize - 1)) {

    return "right";
  }
  if (y == 0) {
    return "left";
  }
  return "center";
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return "critical";
  }

  if (health < 50) {
    return "normal";
  }

  return "high";
}

export const generateMatrix = (boardSize) => {
  let matrix = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      matrix.push([i, j]);
    }
  }
  return matrix;
};

export const generateTooltip = () => {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  const tooltipContent = document.createElement("div");
  tooltipContent.classList.add("tooltip_content");
  tooltip.appendChild(tooltipContent);
  return tooltip;
};

export const getCharacteristics = (currentCellCharacter) => {
  return `🏅 ${currentCellCharacter.character.level} ⚔️ ${currentCellCharacter.character.attack} 🛡 ${currentCellCharacter.character.defence} ❤️ ${currentCellCharacter.character.health}`;
};

export const determineValidMoves = (selectedCharacter, hoverCell, boardMatrix, getCoords = false) => {
  const selectedCoords = boardMatrix[selectedCharacter.position];
  let step = selectedCharacter.character.speed;
  let validCoords = [];
  for (let i = selectedCoords[0]; i <= selectedCoords[0] + step; i += 1) {
    validCoords.push([i, selectedCoords[1]]);
  }
  for (let i = selectedCoords[0]; i >= selectedCoords[0] - step; i -= 1) {
    validCoords.push([i, selectedCoords[1]]);
  }

  for (let i = selectedCoords[1]; i <= selectedCoords[1] + step; i += 1) {
    validCoords.push([selectedCoords[0], i]);
  }
  for (let i = selectedCoords[1]; i >= selectedCoords[1] - step; i -= 1) {
    validCoords.push([selectedCoords[0], i]);
  }

  for (let i = 0; i <= step; i += 1) {
    validCoords.push([selectedCoords[0] + i, selectedCoords[1] + i]);
    validCoords.push([selectedCoords[0] + i, selectedCoords[1] - i]);
    validCoords.push([selectedCoords[0] - step + i, selectedCoords[1] - step + i]);
    validCoords.push([selectedCoords[0] - step + i, selectedCoords[1] + step - i]);
  }

  for (let i = selectedCoords[1]; i >= selectedCoords[1] - step; i -= 1) {
    validCoords.push([selectedCoords[0], i]);
  }

  if (getCoords) {
    return validCoords;
  }

  const hoveredCoords = boardMatrix[hoverCell];
  try {
    if (validCoords.find(item => item.toString() == hoveredCoords.toString())) {
      return true;
    } else {
      return false;
    }

  } catch (error) {
    debugger;
  }
};

export const determineValidAttacks = (selectedCharacter, hoverCell, boardMatrix, getCoords = false) => {
  const selectedCoords = boardMatrix[selectedCharacter.position];
  let step = selectedCharacter.character.attackRange;
  let validCoords = [];
  for (let i = selectedCoords[0]; i <= selectedCoords[0] + step; i += 1) {
    validCoords.push([i, selectedCoords[1]]);
  }
  for (let i = selectedCoords[0]; i >= selectedCoords[0] - step; i -= 1) {
    validCoords.push([i, selectedCoords[1]]);
  }

  for (let i = selectedCoords[1]; i <= selectedCoords[1] + step; i += 1) {
    validCoords.push([selectedCoords[0], i]);
  }
  for (let i = selectedCoords[1]; i >= selectedCoords[1] - step; i -= 1) {
    validCoords.push([selectedCoords[0], i]);
  }

  for (let i = 0; i <= step; i += 1) {
    validCoords.push([selectedCoords[0] + i, selectedCoords[1] + i]);
    validCoords.push([selectedCoords[0] + i, selectedCoords[1] - i]);
    validCoords.push([selectedCoords[0] - step + i, selectedCoords[1] - step + i]);
    validCoords.push([selectedCoords[0] - step + i, selectedCoords[1] + step - i]);
  }

  for (let i = selectedCoords[1]; i >= selectedCoords[1] - step; i -= 1) {
    validCoords.push([selectedCoords[0], i]);
  }

  if (getCoords) {
    return validCoords;
  }

  const hoveredCoords = boardMatrix[hoverCell];
  if (validCoords.find(item => item.toString() == hoveredCoords.toString())) {
    return true;
  } else {
    return false;
  }
};

export const determineCharacterTeam = (team1, team2, hoverCharacter) => {
  let currentCharacterTeam = -1;
  if (team1.includes(hoverCharacter)) {
    currentCharacterTeam = 0;
  }
  if (team2.includes(hoverCharacter)) {
    currentCharacterTeam = 1;
  }
  return currentCharacterTeam;
};
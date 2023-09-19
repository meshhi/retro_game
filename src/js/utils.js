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
    return 'top-left';
  }
  if ((x == 0) && (y == (boardSize - 1))) {
    return 'top-right';
  }
  if ((x == (boardSize - 1)) && (y == 0)) {
    return 'bottom-left';
  }
  if ((x == (boardSize - 1)) && (y == (boardSize - 1))) {
    return 'bottom-right';
  }
  if (x == (boardSize - 1)) {
    return 'bottom';
  }
  if (x == 0) {
    return 'top';
  }
  if (y == (boardSize - 1)) {

    return 'right';
  }
  if (y == 0) {
    return 'left';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export const generateMatrix = (boardSize) => {
  let matrix = []
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      matrix.push([i, j])
    }
  }
  return matrix
}
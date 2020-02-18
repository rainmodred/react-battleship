import Gameboard from './Gameboard';
import getRandomInt from '../utils';
import Player from './Player';

export default function ComputerPlayer() {
  const gameboard = Gameboard();
  let hitsHistory = [];
  let turn = false;

  const { getFiringboard } = Player();
  const randomAttack = board => {
    const emptyCellCooords = [];
    const BOARD_SIZE = gameboard.length;

    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === '') {
          emptyCellCooords.push({ row, col });
        }
      }
    }

    const evenCoords = emptyCellCooords.filter(coords => (coords.row + coords.col) % 2 === 1);
    if (evenCoords.length > 0) {
      return evenCoords[getRandomInt(0, evenCoords.length)];
    }

    return emptyCellCooords[getRandomInt(0, emptyCellCooords.length)];
  };

  const searchingAttack = board => {
    const { row, col } = hitsHistory[hitsHistory.length - 1];

    const neighbors = [];

    if (hitsHistory.length > 1) {
      const prevHitCoords = hitsHistory[hitsHistory.length - 2];

      if (prevHitCoords.row === row) {
        const sortedHitsHistory = hitsHistory.sort((a, b) => a.col - b.col);
        const [minCoords, maxCoords] = sortedHitsHistory;

        neighbors.push({ row, col: maxCoords.col + 1 });
        neighbors.push({ row, col: minCoords.col - 1 });
      }

      if (prevHitCoords.col === col) {
        const sortedHitsHistory = hitsHistory.sort((a, b) => a.row - b.row);
        const [minCoords, maxCoords] = sortedHitsHistory;

        neighbors.push({ row: maxCoords.row + 1, col });
        neighbors.push({ row: minCoords.row - 1, col });
      }
    } else {
      neighbors.push({ row: row - 1, col });
      neighbors.push({ row, col: col + 1 });
      neighbors.push({ row: row + 1, col });
      neighbors.push({ row, col: col - 1 });
    }

    const emptyNeighbors = [];
    neighbors.forEach(coords => {
      if (board[coords.row][coords.col] === '') {
        emptyNeighbors.push(coords);
      }
    });

    return neighbors[getRandomInt(0, emptyNeighbors.length)];
  };

  const getAttackCoords = enemy => {
    let coords;
    const enemyBoard = enemy.getGameboard();

    if (hitsHistory.length === 0) {
      coords = randomAttack(enemyBoard);
    } else {
      coords = searchingAttack(enemyBoard);
    }
    return coords;
  };

  const attack = enemy => {
    const { row, col } = getAttackCoords(enemy);
    const attackResult = enemy.gameboard.receiveAttack(row, col);
    if (attackResult === 'miss') {
      turn = false;
      return;
    }

    if (attackResult === 'dead') {
      hitsHistory = [];
    }

    hitsHistory.push({ row, col });
    turn = true;
  };

  return {
    gameboard,
    attack,
    getFiringboard,
  };
}

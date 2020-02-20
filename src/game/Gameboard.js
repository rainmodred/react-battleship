import Ship from './Ship';
import getRandomInt from '../utils';
import { BOARD_SIZE } from '../constants/ItemTypes';

function createBoard() {
  const arr = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    arr.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      arr[i].push('');
    }
  }
  return arr;
}

export const validCoords = coords =>
  !!(coords.row >= 0 && coords.col >= 0 && coords.row < BOARD_SIZE && coords.col < BOARD_SIZE);

export default function Gameboard() {
  let board = createBoard();
  let ships = [];

  const getGameboard = () => board;
  const getAttackboard = () => board.map(row => row.map(cell => (cell === 'S' ? '' : cell)));
  const getShips = () => ships;

  const getNeighbors = (ship, withShip = true) => {
    const { length = 1, orientation } = ship;
    const { row, col } = ship.getStartCoords();

    const coordsArr = [];

    if (!orientation) {
      coordsArr.push({ row: row - 1, col: col - 1 });
      coordsArr.push({ row: row - 1, col });
      coordsArr.push({ row: row - 1, col: col + 1 });

      for (let i = row; i < row + length; i++) {
        coordsArr.push({ row: i, col: col - 1 });
        if (withShip) {
          coordsArr.push({ row: i, col });
        }
        coordsArr.push({ row: i, col: col + 1 });
      }
      coordsArr.push({ row: row + length, col: col - 1 });
      coordsArr.push({ row: row + length, col });
      coordsArr.push({ row: row + length, col: col + 1 });
    }

    if (orientation) {
      coordsArr.push({ row: row - 1, col: col - 1 });
      coordsArr.push({ row, col: col - 1 });
      coordsArr.push({ row: row + 1, col: col - 1 });

      for (let i = col; i < col + length; i++) {
        coordsArr.push({ row: row - 1, col: i });
        if (withShip) {
          coordsArr.push({ row, col: i });
        }
        coordsArr.push({ row: row + 1, col: i });
      }

      coordsArr.push({ row: row - 1, col: col + length });
      coordsArr.push({ row, col: col + length });
      coordsArr.push({ row: row + 1, col: col + length });
    }
    return coordsArr.filter(validCoords);
  };
  const markArea = ship => {
    const coordsArr = getNeighbors(ship, false);
    coordsArr.forEach(coords => {
      board[coords.row][coords.col] = 'M';
    });
  };
  const canPlaceShip = ship => {
    const { length } = ship;
    const { row, col } = ship.getStartCoords();

    if (row + length > 10 || col + length > 10) {
      return false;
    }

    const neighbors = getNeighbors(ship);
    let hasShip = false;
    for (const coords of neighbors) {
      if (board[coords.row][coords.col] === 'S') {
        hasShip = true;
        break;
      }
    }

    return !hasShip;
  };
  const canMoveShip = (ship, row, col) => {
    // delete ship and try place
    const shipCoords = ship.getCoords();
    shipCoords.forEach(coords => {
      board[coords.row][coords.col] = '';
    });
    ships = ships.filter(s => s.id !== ship.id);
    const newShip = Ship(row, col, ship.length, ship.orientation);
    if (canPlaceShip(newShip)) {
      return true;
    }

    shipCoords.forEach(coords => {
      board[coords.row][coords.col] = 'S';
    });
    ships.push(ship);
    return false;
  };
  const placeShip = ship => {
    if (canPlaceShip(ship)) {
      ship.getCoords().forEach(coords => {
        board[coords.row][coords.col] = 'S';
      });
      ships.push(ship);
      return true;
    }
    return false;
  };
  const placeShips = () => {
    const shipsToPlace = {
      s4: { quantity: 1, length: 4 },
      s3: { quantity: 2, length: 3 },
      s2: { quantity: 3, length: 2 },
      s1: { quantity: 4, length: 1 },
    };

    Object.entries(shipsToPlace).forEach(([name, ship]) => {
      let { quantity, length } = ship;

      while (quantity > 0) {
        const newShip = Ship(
          getRandomInt(0, BOARD_SIZE),
          getRandomInt(0, BOARD_SIZE),
          length,
          Math.random() > 0.5
        );

        if (placeShip(newShip)) {
          quantity--;
        }
      }
    });
  };
  const moveShip = (ship, row, col) => {
    if (canMoveShip(ship, row, col)) {
      const movedShip = Ship(row, col, ship.length, ship.orientation);
      placeShip(movedShip);
      return true;
    }
  };

  const randomizeShips = () => {
    board = createBoard();
    ships = [];
    placeShips();
  };

  const receiveAttack = (row, col) => {
    if (board[row][col] !== 'S') {
      board[row][col] = 'M';
      return 'miss';
    }

    const ship = ships.find(s =>
      s.getCoords().find(coords => coords.row === row && coords.col === col)
    );
    if (ship) {
      ship.hit();
      if (ship.isSunk()) {
        board[row][col] = 'X';
        markArea(ship);
        return 'dead';
      }
      board[row][col] = 'X';
      return 'hit';
    }
  };
  return {
    getShips,
    getGameboard,
    getAttackboard,
    placeShip,
    moveShip,
    placeShips,
    receiveAttack,
    randomizeShips,
  };
}

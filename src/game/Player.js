import Gameboard from './Gameboard';

export default function Player() {
  const gameboard = Gameboard();

  const hasLost = () => {
    return gameboard.getShips().every(ship => ship.isSunk());
  };
  const attack = (enemy, row, col) => {
    const attackResult = enemy.receiveAttack(row, col);
    return attackResult !== 'miss';
  };

  const {
    receiveAttack,
    placeShip,
    placeShips,
    getGameboard,
    getAttackboard,
    getShips,
    randomizeShips,
    canMoveShip,
    moveShip,
  } = gameboard;

  return {
    receiveAttack,
    placeShip,
    placeShips,
    getGameboard,
    getAttackboard,
    getShips,
    attack,
    hasLost,
    randomizeShips,
    canMoveShip,
    moveShip,
  };
}

import Gameboard from './Gameboard';

export default function Player() {
  const gameboard = Gameboard();
  let turn = true;

  const getTurn = () => turn;
  const hasLost = () => {
    const ships = gameboard.getShips();
    return ships.every(ship => ship.isSunk());
  };
  const getGameboard = () =>
    // return gameboard without ships
    gameboard.board.map(row => row.map(cell => (cell === 'S' ? '' : cell)));
  const attack = (enemy, row, col) => {
    const attackResult = enemy.gameboard.receiveAttack(row, col);
    turn = attackResult !== 'miss';
  };
  return {
    getTurn,
    getGameboard,
    gameboard,
    hasLost,
    attack,
  };
}

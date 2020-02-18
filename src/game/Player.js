import Gameboard from './Gameboard';

export default function Player() {
  const gameboard = Gameboard();
  let turn = true;

  const getTurn = () => turn;
  const hasLost = () => {
    const ships = gameboard.getShips();
    return ships.every(ship => ship.isSunk());
  };
  const getFiringboard = () =>
    // return gameboard without ships
    gameboard.getBoard().map(row => row.map(cell => (cell === 'S' ? '' : cell)));
  const attack = (enemy, row, col) => {
    const attackResult = enemy.gameboard.receiveAttack(row, col);
    turn = attackResult !== 'miss';
  };
  return {
    getTurn,
    getFiringboard,
    gameboard,
    hasLost,
    attack,
  };
}

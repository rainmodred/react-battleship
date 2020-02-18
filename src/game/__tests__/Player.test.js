import Player from '../Player';
import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Player', () => {
  let player = Player();
  beforeEach(() => {
    player = Player();
  });
  it('hasLost return true if player lost all ships ', () => {
    const ship = Ship(2, 2, 1);
    player.gameboard.placeShip(ship);
    ship.hit();

    expect(player.hasLost()).toBeTruthy();
  });
  it('hasLost return false if player has alive ship', () => {
    const ship = Ship(2, 2, 2);
    player.gameboard.placeShip(ship);
    ship.hit();

    expect(player.hasLost()).toBeFalsy();
  });

  it('attackResult === "miss" turn return false', () => {
    const player1 = Player();

    player.attack(player1, 0, 0);

    expect(player.getTurn()).toBeFalsy();
  });

  it('attackResult === "miss" turn return true', () => {
    const player1 = Player();
    const ship = Ship(0, 0, 2);
    player1.gameboard.placeShip(ship);
    player.attack(player1, 0, 0);

    expect(player.getTurn()).toBeTruthy();
  });

  it('attackResult === "miss" turn return true', () => {
    const player1 = Player();
    const ship = Ship(0, 0, 1);
    player1.gameboard.placeShip(ship);
    player.attack(player1, 0, 0);

    expect(player.getTurn()).toBeTruthy();
  });
});

import Player from '../Player';
import Ship from '../Ship';

describe('Player', () => {
  let player = Player();
  beforeEach(() => {
    player = Player();
  });
  it('return true if player lost all ships ', () => {
    const ship = Ship(2, 2, 1);
    player.placeShip(ship);
    ship.hit();

    expect(player.hasLost()).toBeTruthy();
  });
  it('return false if player has alive ship', () => {
    const ship = Ship(2, 2, 2);
    player.placeShip(ship);
    ship.hit();

    expect(player.hasLost()).toBeFalsy();
  });

  it('return false if attackResult === "miss"', () => {
    const player1 = Player();

    expect(player.attack(player1, 0, 0)).toBeFalsy();
  });

  it('return true if attackResult === "hit"', () => {
    const player1 = Player();
    const ship = Ship(0, 0, 2);
    player1.placeShip(ship);

    expect(player.attack(player1, 0, 0)).toBeTruthy();
  });

  it('return true if attackResult === "miss"', () => {
    const player1 = Player();
    const ship = Ship(0, 0, 1);
    player1.placeShip(ship);

    expect(player.attack(player1, 0, 0)).toBeTruthy();
  });
});

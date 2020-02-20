import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Gameboard', () => {
  let gameboard = Gameboard();
  beforeEach(() => {
    gameboard = Gameboard();
  });
  it.each([
    [Ship(0, 0, 1, true), true],
    [Ship(0, 0, 2, true), true],
    [Ship(0, 0, 3, true), true],
    [Ship(0, 0, 4, true), true],
    [Ship(0, 6, 4, true), true],
    [Ship(6, 0, 4, false), true],
  ])('placeShip return expected when ship has valid coords', (placedShip, expected) => {
    /* 
      valid coords 
        row > 0 && col > 0 
        if horizontal col + length < 10
        if vertical row + length < 10
    */
    expect(gameboard.placeShip(placedShip)).toBe(expected);
    expect(gameboard.getShips()).toHaveLength(1);
  });
  it.each([
    [Ship(0, 9, 2, true), false],
    [Ship(9, 0, 2, false), false],
    [Ship(0, 7, 4, true), false],
  ])('placeShip return expected when ship coords is not valid', (placedShip, expected) => {
    expect(gameboard.placeShip(placedShip)).toBe(expected);
    expect(gameboard.getShips()).toHaveLength(0);
  });
  it(`placeShip return false if found another ship around new ship`, () => {
    const ship = Ship(2, 2, 2);

    gameboard.placeShip(ship);

    expect(gameboard.placeShip(Ship(1, 1, 1))).toBeFalsy();
    expect(gameboard.placeShip(Ship(2, 2, 1))).toBeFalsy();
    expect(gameboard.placeShip(Ship(3, 2, 1))).toBeFalsy();
    expect(gameboard.placeShip(Ship(3, 4, 1))).toBeFalsy();
  });
  it('moveShip return true if ship moved to valid coords ', () => {
    const ship = Ship(2, 2, 2);
    gameboard.placeShip(ship);

    expect(gameboard.moveShip(ship, 5, 5)).toBeTruthy();
    expect(gameboard.moveShip(ship, 2, 3)).toBeTruthy();
  });
  it('moveShip return false if ship moved to inValid coords or found another ship around', () => {
    const ship = Ship(2, 2, 2);
    const ship1 = Ship(5, 5, 1);

    gameboard.placeShip(ship);
    gameboard.placeShip(ship1);

    expect(gameboard.moveShip(ship, 5, 5)).toBeFalsy();
    expect(gameboard.moveShip(ship, 2, 9)).toBeFalsy();
  });
  it(`can't moveShip if found another ship around`, () => {});
  it('create board with 10 ships', () => {
    gameboard.placeShips();
    expect(gameboard.getGameboard()).toHaveLength(10);
    expect(gameboard.getGameboard()[0]).toHaveLength(10);
    expect(gameboard.getShips()).toHaveLength(10);
  });
  it('receiveAttack return miss', () => {
    expect(gameboard.receiveAttack(2, 2)).toBe('miss');
  });
  it('receiveAttack return hit', () => {
    const ship = Ship(2, 2, 2);
    gameboard.placeShip(ship);

    expect(gameboard.receiveAttack(2, 2)).toBe('hit');
    expect(gameboard.getShips()[0].isSunk()).toBeFalsy();
  });
  it('receiveAttack return dead', () => {
    const ship = Ship(2, 2, 1);
    gameboard.placeShip(ship);

    expect(gameboard.receiveAttack(2, 2)).toBe('dead');
    expect(gameboard.getShips()[0].isSunk()).toBeTruthy();
  });
});

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
  ])(
    'placeShip return expected when ship has valid coords',
    (placedShip, expected) => {
      /* 
      valid coords 
        row > 0 && col > 0 
        if horizontal col + length < 10
        if vertical row + length < 10
    */
      expect(gameboard.placeShip(placedShip)).toBe(expected);
      expect(gameboard.getShips()).toHaveLength(1);
    }
  );
  it.each([
    [Ship(0, 9, 2, true), false],
    [Ship(9, 0, 2, false), false],
    [Ship(0, 7, 4, true), false],
  ])(
    'placeShip return expected when ship coords is not valid',
    (placedShip, expected) => {
      expect(gameboard.placeShip(placedShip)).toBe(expected);
      expect(gameboard.getShips()).toHaveLength(0);
    }
  );
  it(`placeShip return false if found another ship around new ship`, () => {
    const ship = Ship(2, 2, 2);

    gameboard.placeShip(ship);

    expect(gameboard.placeShip(Ship(1, 1, 1))).toBeFalsy();
    expect(gameboard.placeShip(Ship(2, 2, 1))).toBeFalsy();
    expect(gameboard.placeShip(Ship(3, 2, 1))).toBeFalsy();
    expect(gameboard.placeShip(Ship(3, 4, 1))).toBeFalsy();
  });
  it('moveShip return movedShip if ship moved ', () => {
    const ship = Ship(2, 2, 3);
    const ship1 = Ship(8, 8, 2, false);
    gameboard.placeShip(ship);
    gameboard.placeShip(ship1);

    const afterFirstMove = Ship(0, 0, 3);
    const shipAfterFirstMove = gameboard.moveShip(ship, 0, 0);

    const afterSecondMove = Ship(1, 1, 3);
    const shipAfterSecondMove = gameboard.moveShip(shipAfterFirstMove, 1, 1);

    const afterFirstMove1 = Ship(8, 9, 2, false);
    const ship1AfterFirstMove = gameboard.moveShip(ship1, 8, 9);

    expect(shipAfterFirstMove.coords).toEqual(afterFirstMove.coords);
    expect(shipAfterSecondMove.coords).toEqual(afterSecondMove.coords);
    expect(ship1AfterFirstMove.coords).toEqual(afterFirstMove1.coords);
    expect(gameboard.getShips()).toHaveLength(2);
  });
  it('moveShip return undefined if ship moved to inValid coords', () => {
    const ship = Ship(0, 0, 4, false);
    const ship1 = Ship(3, 3, 4);

    gameboard.placeShip(ship);
    gameboard.placeShip(ship1);

    expect(gameboard.moveShip(ship, 5, 10)).toBeUndefined();
    expect(gameboard.moveShip(ship, 7, 0)).toBeUndefined();
    expect(gameboard.moveShip(ship, 0, 7)).toBeUndefined();
    expect(gameboard.moveShip(ship, 10, 0)).toBeUndefined();
  });
  it(`moveShip return undefined if found another ship around`, () => {
    const ship = Ship(2, 2, 2);
    const ship1 = Ship(5, 5, 1);

    gameboard.placeShip(ship);
    gameboard.placeShip(ship1);

    expect(gameboard.moveShip(ship, 5, 5)).toBeUndefined();
    expect(gameboard.moveShip(ship1, 2, 3)).toBeUndefined();
  });
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

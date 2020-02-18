import Ship from '../Ship';

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = Ship(0, 0, 2);
  });

  it('can create ship', () => {
    expect(ship.coords[0]).toEqual({ row: 0, col: 0 });
    expect(ship.length).toBe(2);
    expect(ship.isSunk()).toBeFalsy();
  });

  it('isSunk return true if ship hits === length', () => {
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBeTruthy();
  });
});

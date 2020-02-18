import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Gameboard from './game/Gameboard';
import Ship from './game/Ship';

const gameboard = Gameboard();
const ship = Ship(0, 0, 3);
const ship1 = Ship(5, 5, 1);

gameboard.placeShip(ship);
gameboard.placeShip(ship1);
// gameboard.placeShip(ship1);
gameboard.placeShip(ship, 5, 5);
console.log(gameboard.getBoard());
console.log(gameboard.getShips());

ReactDOM.render(<App />, document.getElementById('root'));

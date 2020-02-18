import React, { useState } from 'react';
import styled from 'styled-components';
import Player from '../game/Player';
import ComputerPlayer from '../game/ComputerPlayer';
import Board from './Board';
import GameBoard from './Gameboard';
import FiringBoard from './FiringBoard';
import GameState from './GameState';

const StyledGame = styled.div`
  display: inline-grid;
  grid-template-rows: 100px 100px auto;
  grid-template-columns: 1fr 1fr;
`;

const StyledHeader = styled.header`
  grid-column: 1 / 4;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const player = Player();
player.gameboard.placeShips();
const computerPlayer = ComputerPlayer();
computerPlayer.gameboard.placeShips();

export default function Game() {
  const [gameboard, setGameboard] = useState(player.gameboard.getBoard());
  const [firingboard, setFiringboard] = useState(computerPlayer.getFiringboard());
  const [ships, setShips] = useState(player.gameboard.getShips());

  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState('');

  const handleCellClick = (row, col) => {
    console.log(row, col);
  };

  const handleRandom = () => {
    if (started) {
      return;
    }
    player.gameboard.randomizeShips();
    setShips([...player.gameboard.getShips()]);
  };

  return (
    <StyledGame>
      <StyledHeader>
        <h1>Battleship</h1>
      </StyledHeader>
      <GameState
        winner={winner}
        started={started}
        onRandom={handleRandom}
        // onPlay={handlePlay}
        // onNewGame={handleNewGame}

        // whoseTurn={whoseTurn}
      />
      <Board>
        <GameBoard board={gameboard} ships={ships} />
      </Board>
      <Board>
        <FiringBoard board={firingboard} onCellClick={handleCellClick} />
      </Board>
    </StyledGame>
  );
}

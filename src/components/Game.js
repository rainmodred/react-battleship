import React, { useState } from 'react';
import styled from 'styled-components';
import Player from '../game/Player';
import ComputerPlayer from '../game/ComputerPlayer';
import Board from './Board';
import GameBoard from './Gameboard';
import FiringBoard from './FiringBoard';

const StyledGame = styled.div`
  display: inline-grid;
  grid-template-rows: 100px 100px auto;
  grid-template-columns: 1fr 1fr;
`;

const player = Player();
player.gameboard.placeShips();
const computerPlayer = ComputerPlayer();
computerPlayer.gameboard.placeShips();

export default function Game() {
  const [playerGameboard, setPlayerGameboard] = useState(player.gameboard.getBoard());
  const [playerFiringboard, setPlayerFiringboard] = useState(computerPlayer.getFiringboard());
  const [playerShips, setPlayerShips] = useState(player.gameboard.getShips());

  const handleCellClick = (row, col) => {
    console.log(row, col);
  };

  return (
    <StyledGame>
      <Board>
        <GameBoard board={playerGameboard} ships={playerShips} />
      </Board>
      <Board>
        <FiringBoard board={playerFiringboard} onCellClick={handleCellClick} />
      </Board>
    </StyledGame>
  );
}

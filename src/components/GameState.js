import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  align-self: center;
  padding: 10px 20px;
  margin-top: 4px;
  border: none;
  border-radius: 5px;
  background-color: lightgreen;
  outline: none;
  cursor: pointer;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  grid-column: 1 / 4;
  justify-content: space-around;
  align-items: center;
`;

const StyledMessage = styled.h3`
  margin-top: 10px;
  text-align: center;
`;

export default function GameState({
  onRandom,
  onPlay,
  onNewGame,
  started,
  winner,
  whoseTurn,
}) {
  return (
    <StyledButtonsWrapper>
      {started && <StyledButton onClick={onNewGame}>New Game</StyledButton>}
      {!winner && !started && (
        <StyledButton onClick={onPlay}>Play</StyledButton>
      )}
      {!started && !winner && <StyledMessage>Place ships</StyledMessage>}
      {started && !winner && <StyledMessage>{whoseTurn}</StyledMessage>}
      {started && winner && (
        <StyledMessage>{`${winner} won the game`}</StyledMessage>
      )}
      <StyledButton onClick={onRandom} disabled={started}>
        Random
      </StyledButton>
    </StyledButtonsWrapper>
  );
}

GameState.propTypes = {
  onRandom: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onNewGame: PropTypes.func.isRequired,
  started: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired,
  whoseTurn: PropTypes.string.isRequired,
};

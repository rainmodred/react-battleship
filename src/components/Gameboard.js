import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from './Cell';
import Ship from './Ship';

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 32px);
  grid-template-rows: repeat(10, 32px);
  position: relative;
`;

export default function Gameboard({ board, ships }) {
  const renderCells = () =>
    board.map((row, rowIndex) =>
      row.map((cell, colIndex) => <Cell type={cell} key={`g${rowIndex}${colIndex}`} />)
    );

  const renderShips = () =>
    ships.map(ship => {
      const { row, col } = ship.getStartCoords();
      return (
        <Ship
          row={row}
          col={col}
          id={ship.id}
          key={ship.id}
          length={ship.length}
          orientation={ship.orientation}
        />
      );
    });

  return (
    <StyledBoard>
      {renderCells()}
      {renderShips()}
    </StyledBoard>
  );
}

Gameboard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  ships: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      length: PropTypes.number.isRequired,
      orientation: PropTypes.bool.isRequired,
      coords: PropTypes.arrayOf(
        PropTypes.shape({
          row: PropTypes.number.isRequired,
          col: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
};

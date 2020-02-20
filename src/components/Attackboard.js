import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from './Cell';

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 32px);
  grid-template-rows: repeat(10, 32px);
  position: relative;
`;

export default function Attackboard({ board, onCellClick }) {
  const renderCells = () =>
    board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell
          type={cell}
          key={`g${rowIndex}${colIndex}`}
          onCellClick={() => onCellClick(rowIndex, colIndex)}
        />
      ))
    );

  return <StyledBoard>{renderCells()}</StyledBoard>;
}

Attackboard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  onCellClick: PropTypes.func.isRequired,
};

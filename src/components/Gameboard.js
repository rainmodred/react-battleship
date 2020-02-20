import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from '../constants/ItemTypes';
import Cell from './Cell';
import Ship from './Ship';

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 32px);
  grid-template-rows: repeat(10, 32px);
  position: relative;
`;

function getDndCoords(delta, item) {
  const y = 32 * item.row;
  const x = 32 * item.col;

  const row = parseInt(Math.round((y + delta.y) / 32), 10);
  const col = parseInt(Math.round((x + delta.x) / 32), 10);
  return { row, col };
}

export default function Gameboard({ board, ships, canMoveShip, moveShip }) {
  const [, drop] = useDrop({
    accept: ItemTypes.SHIP,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      // const y = 32 * item.row;
      // const x = 32 * item.col;

      // const row = parseInt(Math.round((y + delta.y) / 32), 10);
      // const col = parseInt(Math.round((x + delta.x) / 32), 10);
      const { row, col } = getDndCoords(delta, item);
      moveShip(item, row, col);
      return undefined;
    },
    canDrop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      // const y = 32 * item.row;
      // const x = 32 * item.col;

      // const row = parseInt(Math.round((y + delta.y) / 32), 10);
      // const col = parseInt(Math.round((x + delta.x) / 32), 10);
      const { row, col } = getDndCoords(delta, item);
      return canMoveShip(item, row, col);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const renderCells = () =>
    board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Cell type={cell} key={`g${rowIndex}${colIndex}`} />
      ))
    );

  const renderShips = () =>
    ships.map(ship => {
      const { row, col } = ship.getStartCoords();
      const { coords } = ship;
      return (
        <Ship
          coords={coords}
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
    <StyledBoard ref={drop}>
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

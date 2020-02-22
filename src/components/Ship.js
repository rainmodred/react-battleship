import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

const StyledShip = styled.div.attrs(
  ({ row, col, length, orientation, isDragging }) => ({
    style: {
      top: row * 32,
      left: col * 32,
      width: orientation ? 32 * length + 1 : '33px',
      height: !orientation ? 32 * length + 1 : '33px',
      opacity: isDragging ? 0.3 : 0.7,
    },
  })
)`
  position: absolute;
  border: 2px solid #00f;
  background-color: rgba(0, 0, 255, 0.05);
  cursor: move;
`;

export default function Ship({ id, length, orientation, coords }) {
  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      length,
      orientation,
      coords,
      type: ItemTypes.SHIP,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { row, col } = coords[0];

  if (isDragging) {
    return (
      <StyledShip
        ref={drag}
        row={row}
        col={col}
        length={length}
        orientation={orientation && true}
        isDragging
      />
    );
  }
  return (
    <StyledShip
      ref={drag}
      row={row}
      col={col}
      length={length}
      orientation={orientation && true}
      isDragging={false}
    />
  );
}

Ship.propTypes = {
  id: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  orientation: PropTypes.bool.isRequired,
  coords: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number.isRequired,
      col: PropTypes.number.isRequired,
    })
  ).isRequired,
};

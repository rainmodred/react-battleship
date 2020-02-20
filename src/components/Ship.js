import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants/ItemTypes';

const StyledShip = styled.div.attrs(({ row, col, length, orientation }) => ({
  style: {
    top: row * 32,
    left: col * 32,
    width: orientation ? 32 * length + 1 : '33px',
    height: !orientation ? 32 * length + 1 : '33px',
  },
}))`
  position: absolute;
  border: 2px solid #00f;
  background-color: rgba(0, 0, 255, 0.05);
  cursor: move;
  opacity: 0.7;
`;

export default function Ship(props) {
  const { id, row, col, length, orientation, coords } = props;

  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      row,
      col,
      length,
      orientation,
      coords,
      type: ItemTypes.SHIP,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return <StyledShip ref={drag} {...props} style={{ opacity: 0.3 }} />;
  }
  return <StyledShip ref={drag} {...props} orientation={orientation} />;
}

Ship.propTypes = {
  id: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  orientation: PropTypes.bool.isRequired,
};

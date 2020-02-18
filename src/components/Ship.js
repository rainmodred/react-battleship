import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  return <StyledShip {...props} orientation={props.orientation ? 1 : 0} />;
}

Ship.propTypes = {
  id: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  orientation: PropTypes.bool.isRequired,
};

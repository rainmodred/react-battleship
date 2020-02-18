import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledCell = styled.div`
  box-shadow: 1px 0 0 0 #b4b4ff, 0 1px 0 0 #b4b4ff, 1px 1px 0 0 #b4b4ff, 1px 0 0 0 #b4b4ff inset,
    0 1px 0 0 #b4b4ff inset;

  &:hover {
    border: ${props => (props.hover ? '2px solid red' : 'none')};
    cursor: ${props => props.hover && 'crosshair'};
  }
`;

const StyledHitCell = styled(StyledCell)`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;

const StyledMarkCell = styled(StyledCell)`
  position: relative;
  background-color: #eee;
  &::before {
    content: '';
    position: absolute;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: #333;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function Cell({ type, onCellClick }) {
  const renderCell = type => {
    if (onCellClick !== void 0) {
      return <StyledCell onClick={onCellClick} hover />;
    }

    switch (type) {
      case 'X': {
        return <StyledHitCell>&#128500;</StyledHitCell>;
      }
      case 'M': {
        return <StyledMarkCell />;
      }
      default: {
        return <StyledCell />;
      }
    }
  };

  return <>{renderCell(type)}</>;
}

Cell.propTypes = {
  type: PropTypes.string.isRequired,
  onCellClick: PropTypes.func,
};

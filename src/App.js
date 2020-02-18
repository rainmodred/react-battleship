import React from 'react';
import styled from 'styled-components';
import Game from './components/Game';

const StyledWrapper = styled.div`
  max-width: 1080px;
  min-width: 990px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export default function App() {
  return (
    <StyledWrapper>
      <Game />
    </StyledWrapper>
  );
}

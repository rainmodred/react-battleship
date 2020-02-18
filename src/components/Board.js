import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBoardContainer = styled.div`
  display: grid;
  width: 342px;
  height: 342px;
  grid-template: 32px 1fr/ 32px 1fr;
  margin-right: 20px;
`;

const StyledNumbersCaption = styled.div`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-column: 1/2;
`;

const StyledCaptionText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;

const StyledLettersCaption = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-column: 2/3;
`;

export default function Board({ children }) {
  return (
    <StyledBoardContainer>
      <StyledLettersCaption>
        <StyledCaptionText>A</StyledCaptionText>
        <StyledCaptionText>B</StyledCaptionText>
        <StyledCaptionText>C</StyledCaptionText>
        <StyledCaptionText>D</StyledCaptionText>
        <StyledCaptionText>E</StyledCaptionText>
        <StyledCaptionText>F</StyledCaptionText>
        <StyledCaptionText>G</StyledCaptionText>
        <StyledCaptionText>H</StyledCaptionText>
        <StyledCaptionText>I</StyledCaptionText>
        <StyledCaptionText>J</StyledCaptionText>
      </StyledLettersCaption>
      <StyledNumbersCaption>
        <StyledCaptionText>1</StyledCaptionText>
        <StyledCaptionText>2</StyledCaptionText>
        <StyledCaptionText>3</StyledCaptionText>
        <StyledCaptionText>4</StyledCaptionText>
        <StyledCaptionText>5</StyledCaptionText>
        <StyledCaptionText>6</StyledCaptionText>
        <StyledCaptionText>7</StyledCaptionText>
        <StyledCaptionText>8</StyledCaptionText>
        <StyledCaptionText>9</StyledCaptionText>
        <StyledCaptionText>10</StyledCaptionText>
      </StyledNumbersCaption>
      {children}
    </StyledBoardContainer>
  );
}

Board.propTypes = {
  children: PropTypes.element.isRequired,
};

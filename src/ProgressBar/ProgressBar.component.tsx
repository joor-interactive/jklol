import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 40px;
  background: white;
  border: 1px solid black;
`;

const ProgressBarInnerBar = styled.div<{ progressAmount: number }>`
  position: absolute;
  width: ${props => `${props.progressAmount * 100}vw`};
  height: 40px;
  background: ${props =>
    `rgb(${255 * (1 - props.progressAmount)},${255 * props.progressAmount},0)`};
`;

type ProgressBarProps = {
  progressAmount: number;
};
const ProgressBar: React.FC<ProgressBarProps> = ({ progressAmount }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarInnerBar progressAmount={progressAmount} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;

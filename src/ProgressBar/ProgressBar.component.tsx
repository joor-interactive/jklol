import React from "react";

const totalWidth = 100;

type ProgressBarProps = {
  progressAmount: number;
};
const ProgressBar: React.FC<ProgressBarProps> = ({ progressAmount }) => {
  const rgb = `rgb(${255 * (1 - progressAmount)},${255 * progressAmount},0)`;
  return (
    <div
      style={{
        position: "relative",
        width: `${totalWidth}vw`,
        height: "40px",
        background: "white",
        border: "1px solid black"
      }}
    >
      <div
        style={{
          position: "absolute",
          width: `${progressAmount * totalWidth}vw`,
          height: "40px",
          background: rgb
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;

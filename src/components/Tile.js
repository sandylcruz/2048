import React from "react";
import styled, { keyframes } from "styled-components";

import { motion } from "framer-motion";

const StyledContent = styled.div`
  font-size: 40px;
  margin-top: 25px;
  opacity: 1 !important;
`;

const StyledTile = styled(motion.div)`
  border: 5px solid #4a4e69;
  display: block;
  background-color: ${({ value }) => (value === 0 ? "#e8e8e4" : "#a8dadc")};

  width: 100px;
  height: 100px;
  text-align: center;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  // top: ${({ position }) => `${Math.floor(position / 4) * 100}px`};

  // &:nth-child(1) {
  //   border-left: 10px solid #4a4e69;
  // }

  // &:nth-child(4) {
  //   border-right: 10px solid #4a4e69;
  // }
`;

const Tile = React.memo(({ id, value, position }) => {
  const top = Math.floor(position / 4) * 100;
  const left = Math.floor(position % 4) * 100;

  console.log("***", position, top, left);

  return (
    <StyledTile
      value={value}
      layoutId={`tile-${id}`}
      initial={{ visibility: "visible", opacity: 1 }}
      top={top}
      left={left}
    >
      {value !== 0 && (
        <StyledContent>{value === 0 ? null : value}</StyledContent>
      )}
    </StyledTile>
  );
});

export default Tile;

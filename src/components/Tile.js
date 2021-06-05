import React, { useState } from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

const StyledContent = styled.div`
  font-size: 40px;
  margin-top: 25px;
  opacity: 1 !important;
`;

const getColor = (value) => {
  if (value === 0) {
    return "#ffffff";
  } else if (value === 2) {
    return "#AED9E0";
  } else if (value === 4) {
    return "#9FA0C3";
  } else if (value === 8) {
    return "#8B687F";
  } else if (value === 16) {
    return "#7B435B";
  } else if (value === 32) {
    return "#1985a1";
  } else if (value === 64) {
    return "#";
  } else if (value === 128) {
    return "#70B7E3";
  } else if (value === 256) {
    return "#";
  } else if (value === 512) {
    return "#";
  } else if (value === 1024) {
    return "#";
  } else {
    return "";
  }
};

const StyledTile = styled(motion.div)`
  border: 5px solid #4a4e69;
  display: block;
  // background-color: ${({ value }) => (value === 0 ? "#e8e8e4" : "#a8dadc")};
  background-color: ${({ value }) => getColor(value)};
  width: 100px;
  height: 100px;
  text-align: center;
  position: absolute;

  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;

const Tile = React.memo(({ grid, id, value, position }) => {
  const top = Math.floor(position / 4) * 100;
  const left = Math.floor(position % 4) * 100;

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

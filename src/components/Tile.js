import React, { useState } from "react";
import styled from "styled-components";

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
  // background-color: ${({ color }) => `${color}`}
  width: 100px;
  height: 100px;
  text-align: center;
  position: absolute;
  // animate={{
  //   x: 0,
  //   backgroundColor: "#000",
  //   boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
  //   position: "fixed",
  //   transitionEnd: {
  //     display: "none",
  //   },
  // }}
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;

const Tile = React.memo(({ grid, id, value, position }) => {
  const [color, setColor] = useState("#e8e8e4");
  const top = Math.floor(position / 4) * 100;
  const left = Math.floor(position % 4) * 100;

  const updateColor = (value) => {
    if (value === 0) {
      setColor("red");
    } else {
      setColor("blue");
    }
    console.log(color);
  };

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

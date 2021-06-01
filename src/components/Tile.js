import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

const StyledContent = styled(motion.div)`
  font-size: 40px;
  margin-top: 25px;
`;

const StyledTile = styled.div`
  border: 5px solid #4a4e69;
  width: 100px;
  height: 100px;
  text-align: center;
  animation: add 0.8s ease-in-out;
  &:nth-child(1) {
    border-left: 10px solid #4a4e69;
  }

  &:nth-child(4) {
    border-right: 10px solid #4a4e69;
  }
`;

// const StyledTile = styled(motion.div)`
//   border: 5px solid #4a4e69;
//   width: 100px;
//   height: 100px;
//   text-align: center;
//   &:nth-child(1) {
//     border-left: 10px solid #4a4e69;
//   }

//   &:nth-child(4) {
//     border-right: 10px solid #4a4e69;
//   }
// `;

const Tile = React.memo(({ value, id }) => {
  return (
    // <StyledTile layoutId={id} animate={{ x: 100 }} transition={{ delay: 1 }}>
    //   <div>{value === 0 ? null : <StyledH1>{value}</StyledH1>}</div>
    // </StyledTile>
    <StyledTile>
      <StyledContent layout>{value === 0 ? null : value}</StyledContent>
    </StyledTile>
  );
});

export default Tile;

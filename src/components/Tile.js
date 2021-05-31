import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

// const StyledH1 = styled(motion.div)`
//   text-align: center;
//   font-size: 40px;
//   padding: 25px;
// `;

const StyledTile = styled.div`
  border: 5px solid #4a4e69;
  width: 100px;
  height: 100px;
  &:nth-child(1) {
    border-left: 10px solid #4a4e69;
  }

  &:nth-child(4) {
    border-right: 10px solid #4a4e69;
  }
`;

const Tile = React.memo(({ value }) => {
  return (
    <StyledTile>
      {value === 0 ? null : <h1 animate={{ scale: 3 }}>{value}</h1>}
    </StyledTile>
  );
});

export default Tile;

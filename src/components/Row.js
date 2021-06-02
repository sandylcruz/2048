import React from "react";
import styled from "styled-components";

import Tile from "./Tile";
import { motion, AnimateSharedLayout } from "framer-motion";

// const RowContainer = styled.div`
//   max-width: 500px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

const RowContainer = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Row = React.memo(({ row }) => {
  return (
    <RowContainer>
      {row.map((tile, index) => (
        <Tile key={index} value={tile.value} id={tile.id} />
      ))}
    </RowContainer>
  );
});

export default Row;

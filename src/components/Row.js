import React from "react";
import styled from "styled-components";

import Tile from "./Tile";

const RowContainer = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Row = ({ row }) => {
  return (
    <RowContainer>
      {row.map((tile, index) => (
        <Tile key={index} value={tile} />
      ))}
    </RowContainer>
  );
};

export default Row;

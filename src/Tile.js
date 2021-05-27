import React from "react";
import styled from "styled-components";

const StyledTile = styled.div`
  border: 1px solid green;
  width: 100px;
  height: 100px;
`;

const Tile = () => {
  return <StyledTile>Hi</StyledTile>;
};

export default Tile;

import React from "react";
import styled from "styled-components";

const StyledH1 = styled.div`
  text-align: center;
  font-size: 40px;
  padding: 25px;
`;

const StyledTile = styled.div`
  border: 5px solid #4a4e69;
  width: 100px;
  height: 100px;
`;

const Tile = () => {
  return (
    <StyledTile>
      <StyledH1>Hi</StyledH1>
    </StyledTile>
  );
};

export default Tile;

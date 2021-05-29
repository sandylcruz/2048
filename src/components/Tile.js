import React, { useState } from "react";
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
  &:nth-child(1) {
    border-left: 10px solid #4a4e69;
  }

  &:nth-child(4) {
    border-right: 10px solid #4a4e69;
  }
`;

const Tile = ({ value }) => {
  // const [tileScore, setTileScore] = useState(0);
  // const [isActive, setIsActive] = useState(false);

  return (
    <StyledTile>{value === 0 ? null : <StyledH1>{value}</StyledH1>}</StyledTile>
  );
};

export default Tile;

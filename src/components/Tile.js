import React from "react";
import styled, { keyframes } from "styled-components";

import { motion } from "framer-motion";

const add = keyframes` {
  0% {
    opacity: 1;
    top: 0;
  }
  100% {
    opacity: 0;
    top: -100%;
  }
}`;

const newTile = keyframes`{
  0% {
   opacity: 0;
  }
  50% {
   opacity: 0;
   transform: scale(0);
  }
  75% {
   opacity: 1;
   transform: scale(0.5);
  }
  100% {
   opacity: 1;
   transform: scale(1);
  }
 }`;

const StyledContent = styled(motion.div)`
  font-size: 40px;
  margin-top: 25px;
  opacity: 1 !important;
`;

export const slideInTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  20% {
    opacity: 1;
    transform: translateY(0px);
  }
  85% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;
// export const pop = keyframes`
//   0% {
//     transform: scale(0.8);
//   }
//   50% {
//     transform: scale(1.3);
//   }
//   100% {
//     transform: scale(1);
//   }
// `;

const pop = keyframes`
{
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  90% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

const StyledTile = styled.div`
  border: 5px solid #4a4e69;
  display: block;
  animation: ${pop} 2s linear;
  animation-duration: 0.35s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  background-color: ${({ value }) => (value === 0 ? "#e8e8e4" : "#a8dadc")};
  width: 100px;
  height: 100px;
  text-align: center;

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

const variants = {
  zero: {
    backgroundColor: "white",
    visibility: "visible",
    opacity: 1,
  },
  nonZero: {
    backgroundColor: "red",
    visibility: "visible",
    opacity: 1,
  },
};

const Tile = React.memo(({ value, id }) => {
  return (
    // <StyledTile layoutId={id} animate={{ x: 100 }} transition={{ delay: 1 }}>
    //   <div>{value === 0 ? null : <StyledH1>{value}</StyledH1>}</div>
    // </StyledTile>

    <StyledTile>
      {value !== 0 && (
        <StyledContent
          layout
          animate={{ rotate: 360, visibility: "visible", opacity: 1 }}
          // animate={value === 0 ? "zero" : "nonZero"}
          transition={{ ease: "easeOut", duration: 1 }}
          initial={{ visibility: "visible", opacity: 1 }}
          variants={variants}
          value={value}
          layoutId={`tile-${id}`}
        >
          {value === 0 ? null : value}
        </StyledContent>
      )}
    </StyledTile>
  );
});

export default Tile;

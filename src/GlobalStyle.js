import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.gradient};
    color: ${({ theme }) => theme.text};
    transition: all 0.20s linear;
    font-family:  "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.20s linear;
    font-family:  "Helvetica Neue", Helvetica, Arial, sans-serif;

  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div {
    // margin: 0;
    padding: 0;
  }

  html {
    min-height: 100vh;
  }

  body {
    background: ${({ theme }) => theme.gradient};
    color: ${({ theme }) => theme.text};
    transition: all 0.20s linear;
    font-family:  "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";
import theme from "styled-theming";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
`;

export default GlobalStyle;

// import { createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
//   html,
//   body,
//   section,
//   article,
//   h1,
//   h2,
//   p,
//   strong,
//   em,
//   a {
//     margin: 0;
//     border: 0;
//     padding: 0;
//     outline: 0;
//     box-sizing: inherit;
//     text-decoration: inherit;
//     text-align: inherit;
//     background: transparent;
//     color: inherit;
//     font-family:  "Helvetica Neue", Helvetica, Arial, sans-serif;
//   }
//   h1 {
//     font-size: 40px;
//     font-weight: bold;
//     margin: 10px;
//   }
//   h2 {
//     font-size: 25px;
//     font-weight: bold;
//     margin: 10px;
//   }
//   body {
//     background-color: #edf2f4;
//   }
// `;

// export default GlobalStyle;

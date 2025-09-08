import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'SpoqaHanSansNeo', sans-serif;
    font-size: 16px;
    color: #333;
    background-color: #fff;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
:root { color-scheme: light; }
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #__next { height: 100%; }
  body { margin: 0; font-family: -apple-system,Pretendard,system-ui,sans-serif; color:#111; }
  button { cursor: pointer; }

`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
`;
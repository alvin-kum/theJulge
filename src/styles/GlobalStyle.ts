import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #__next { height: 100%; }
  body { margin: 0; font-family: -apple-system,Pretendard,system-ui,sans-serif; color:#111; }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; }
`;

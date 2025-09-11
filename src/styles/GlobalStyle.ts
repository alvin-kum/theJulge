import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Root */
  :root {
    color-scheme: light dark;
  }

  /* Base */
  html, body, #__next {
    height: 100%;
  }

  html, body {
    font-family: 'Spoqa Han Sans Neo', Pretendard, -apple-system, system-ui, sans-serif;
    font-size: 16px;
    color: #111;
    background-color: #fff;
    line-height: 1.5;
  }

  /* Modal open 상태 */
  body.modal-open {
    overflow: hidden;
    -ms-overflow-style: none;  /* IE, Edge */
    scrollbar-width: none;     /* Firefox */
  }

  body.modal-open::-webkit-scrollbar {
    display: none;             /* Chrome, Safari, Opera */
  }

  /* Elements */
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

export default GlobalStyle;

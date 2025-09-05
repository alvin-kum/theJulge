import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root { color-scheme: light; }
*, *::before, *::after { box-sizing: border-box; }
html, body, #__next { height: 100%; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; }
a { color: inherit; text-decoration: none; }
`;

export default GlobalStyle;

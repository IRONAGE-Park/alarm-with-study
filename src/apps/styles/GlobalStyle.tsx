import { Global, css } from "@emotion/react";
// React module

import normalColor from "@renderer/styles/colors/normal-color";
import style from "@renderer/styles/themes/style";
// styles

export default function GlobalStyle() {
  return <Global styles={globalStyle} />;
}

const globalStyle = css`
  html {
    overflow: hidden;
  }

  body {
    background: ${normalColor.grayScale.gray100};
  }

  button {
    font: inherit;
  }

  input {
    outline: none;
    border: none;
    font: inherit;
  }

  ul {
    list-style: none;
  }

  img {
    pointer-events: none;
    user-select: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ${style.fontFace.kopub};
    &::-webkit-scrollbar {
      display: none;
    }
    user-select: none;
  }
`;

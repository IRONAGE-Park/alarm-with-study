import type { PropsWithChildren } from "react";
import type { EmotionTheme } from "@renderer/styles/themes/emotion-theme";
import type { ColorTheme } from "@renderer/styles/colors/color";
// types

import { ThemeProvider } from "@emotion/react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
// React.js module

import font, {
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  fontColor,
} from "@renderer/styles/themes/font";
import { colorMap, normal, light } from "@renderer/styles/colors/color";
import whiteSpace from "@renderer/styles/themes/whiteSpace";
import style from "@renderer/styles/themes/style";
import GlobalStyle from "@renderer/styles/GlobalStyle";
// styles

const muiTheme = createTheme();

interface GlobalThemeProviderProps {
  colorTheme?: ColorTheme;
}

export default function GlobalThemeProvider({
  children,
  colorTheme = "normal",
}: PropsWithChildren<GlobalThemeProviderProps>) {
  const theme: EmotionTheme = {
    normal,
    light,

    color: colorMap[colorTheme],

    font,
    fontSize,
    lineHeight,
    fontWeight,
    fontColor,

    whiteSpace,
    textAlign,

    style,
  };
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          {children}
          <GlobalStyle />
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}

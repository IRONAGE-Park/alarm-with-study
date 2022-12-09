import type { EmotionTheme } from "@renderer/styles/themes/emotion-theme";

declare module "@emotion/react" {
  // eslint-disable-next-line
  export interface Theme extends EmotionTheme {}
}

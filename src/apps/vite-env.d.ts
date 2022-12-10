// <reference types="vite/client" />
import type { MAIN_WINDOW, MainWindowApi } from "@preloads/bridges/main-window";
import type {
  THEME_SELECTOR,
  ThemeSelectorApi,
} from "@preloads/bridges/theme-selector";
import { ALARM, AlarmApi } from "@bridges/alarm";

declare global {
  /** `Renderer-process`에서 전역적으로 사용하는 window 객체 */
  interface Window {
    /** `Setting Window` State API */
    [MAIN_WINDOW]: MainWindowApi;
    /** `App Theme` 선택 API */
    [THEME_SELECTOR]: ThemeSelectorApi;
    [ALARM]: AlarmApi;
  }
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

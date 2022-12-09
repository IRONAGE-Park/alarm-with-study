import { contextBridge, ipcRenderer } from "electron";
// Electron Renderer-process module

import {
  type ThemeSelectorApi,
  THEME_SELECTOR,
  ACTION_GET_THEME,
  ACTION_CHANGE_THEME,
  ACTION_CHANGED_THEME,
} from "@bridges/theme-selector/index";
// messages

// 테마 선택 API 등록
const themeSelectApi: ThemeSelectorApi = {
  getStatus: () => ipcRenderer.invoke(ACTION_GET_THEME),
  changeState: (theme: "system" | "dark" | "light") =>
    ipcRenderer.invoke(ACTION_CHANGE_THEME, theme),
  registThemeDetector: (
    receiveTheme: (theme: "system" | "dark" | "light") => void
  ) => {
    ipcRenderer.on(
      ACTION_CHANGED_THEME,
      (event, theme: "system" | "dark" | "light") => {
        receiveTheme(theme);
      }
    );
    return new Promise(r => r);
  },
};
contextBridge.exposeInMainWorld(THEME_SELECTOR, themeSelectApi);

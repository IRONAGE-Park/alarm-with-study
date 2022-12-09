import { contextBridge, ipcRenderer } from "electron";
// Electron Renderer-process module

import {
  type MainWindowApi,
  MAIN_WINDOW,
  ACTION_HIDE_WINDOW,
  ACTION_CLOSE_WINDOW,
} from "@bridges/main-window";
// bridge messages

const mainWindowApi: MainWindowApi = {
  hide: () => ipcRenderer.invoke(ACTION_HIDE_WINDOW),
  close: () => ipcRenderer.invoke(ACTION_CLOSE_WINDOW),
};
contextBridge.exposeInMainWorld(MAIN_WINDOW, mainWindowApi);

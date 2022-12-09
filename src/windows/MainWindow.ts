import path from "path";
// Node.js module

import { BrowserWindow, ipcMain, shell } from "electron";
import isDev from "electron-is-dev";
// Electron Main-process module

import { ACTION_HIDE_WINDOW, ACTION_CLOSE_WINDOW } from "@bridges/main-window";
// bridge messages

import AppIcon from "@assets/icons/app.icns";
// assets

import { PRELOAD_PATH } from "@constants/constants";
// constants

class MainWindow {
  private static instance: MainWindow | null = null;
  window: BrowserWindow | null = null;

  /** '`Main Window` 생성자' */
  constructor() {
    ipcMain.handle(ACTION_HIDE_WINDOW, _ => {
      this.window?.minimize();
    });
    ipcMain.handle(ACTION_CLOSE_WINDOW, _ => {
      this.window?.close();
    });
  }

  get win(): BrowserWindow {
    return this.window!;
  }

  public createWindow(): void {
    // 최근 모드의 사이즈를 켬
    this.window = new BrowserWindow({
      title: "Create - Serial Number Generator",
      icon: AppIcon,
      width: 1080,
      height: 720,
      roundedCorners: true,
      show: false,
      closable: true,
      webPreferences: {
        devTools: isDev, // [DEVELOPMENT MODE]
        zoomFactor: 1.0,
        preload: path.resolve(__dirname, PRELOAD_PATH),
      },
    });

    if (isDev) {
      // [DEVELOPMENT MODE]
      this.window.loadURL(`http://localhost:5173`);
    } else {
      // [PRODUCTION MODE]
      this.window.loadFile(path.resolve(__dirname, `index.html`));
    }

    // Open the DevTools.
    const { webContents } = this.window;
    if (isDev) {
      // [DEVELOPMENT MODE]
      webContents.openDevTools({ mode: "detach" });
    }

    webContents.on("did-finish-load", () => {
      // BrowserWindow가 open 후 모든 리소스가 로드 된 후 callback
      webContents.setZoomFactor(1);
      webContents.setVisualZoomLevelLimits(1, 1);
    });

    this.window.on("closed", () => {
      // BrowserWindow가 닫힌 후 callback
      this.window = null;
    });

    this.window.on("ready-to-show", () => {
      // BrowserWindow가 보여질 준비가 되면 callback
      this.win.show();
    });

    this.window.webContents.on("new-window", (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
  }

  public resetWindow() {
    if (this.window) {
      this.window.show();
    } else {
      this.createWindow();
    }
  }

  public static getInstance() {
    if (this.instance === null) {
      this.instance = new MainWindow();
    }
    return this.instance;
  }
}

export default MainWindow;

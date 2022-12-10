import path from "path";
// Node.js module

import { BrowserWindow, shell } from "electron";
import isDev from "electron-is-dev";
// Electron Main-process module

import AppIcon from "@assets/icons/app.icns";
// assets

import { PRELOAD_PATH } from "@constants/constants";
// constants

/** window URL */
const LOAD_URL = "alarm" as const;
// 상수 정의

class AlarmWindow {
  window: BrowserWindow;

  /** '`Main Window` 생성자' */
  constructor(private id: string) {
    this.window = new BrowserWindow({
      title: "Alarm With Study - Alarm!!",
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
    this.initializeWindow();
  }

  public initializeWindow(): void {
    console.log(this.id);
    if (isDev) {
      // [DEVELOPMENT MODE]
      this.window.loadURL(`http://localhost:5173/${LOAD_URL}/#/${this.id}`);
    } else {
      // [PRODUCTION MODE]
      this.window.loadFile(path.resolve(__dirname, `./${LOAD_URL}/index.html`));
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

    this.window.on("ready-to-show", () => {
      // BrowserWindow가 보여질 준비가 되면 callback
      this.window?.show();
      this.window?.setAlwaysOnTop(true, "screen-saver");
    });

    this.window.webContents.on("new-window", (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });
  }
}

export default AlarmWindow;

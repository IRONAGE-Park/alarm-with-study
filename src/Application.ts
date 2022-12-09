import { app } from "electron";
import log from "electron-log";
// Electron Main-process module

import { usingRegister } from "@main/register/_Register";
import SingleInstance from "@main/register/SingleInstance";
import ThemeSelector from "@main/register/ThemeSelector";
// Main-process Register module

import MainWindow from "@windows/MainWindow";
// Main-process module

import EnvironmentGetter from "@libs/EnvironmentGetter";
// common libraries

class Application {
  private registerProcessHandle() {
    process.on("uncaughtException", error =>
      console.error("uncaughtException:", error)
    );
    process.on("unhandledRejection", error =>
      console.error("unhandledRejection:", error)
    );
    process.on("rejectionHandled", error =>
      console.error("rejectionHandled:", error)
    );
  }

  private initModules() {
    const isMac = EnvironmentGetter.getMainIsMac();

    if (!isMac) {
      // [WINDOWS]
      app.setAppUserModelId(app.name);
    }
  }

  private registerLogManager(isRegister: boolean) {
    if (isRegister) {
      // Electron Log Control.
      Object.assign(console, log.functions);
    }
  }

  private onActivate() {
    MainWindow.getInstance().resetWindow();
  }

  private onWindowAllClosed() {}

  public run() {
    this.registerLogManager(app.isPackaged);
    this.registerProcessHandle();
    this.initModules();

    app
      .on("ready", () => {
        /** `App`이 실행 후 준비 상태가 될 때 callback */
        this.onActivate();
        usingRegister([new SingleInstance(), new ThemeSelector()]); // 모듈 등록 후 메모리에 저장
      })
      .on("activate", () => {
        /** `App`이 활성화될 때 callback */
        this.onActivate();
      })
      .on("window-all-closed", () => {
        /** 모든 `Window`가 종료되었을 때 callback */
        this.onWindowAllClosed();
      });
  }
}

export default Application;

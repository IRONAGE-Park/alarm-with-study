import { usingRegister } from "@main/register/_Register";
import AutoUpdate from "@main/register/AutoUpdate";
import SingleInstance from "@main/register/SingleInstance";
import ThemeSelector from "@main/register/ThemeSelector";
import TrayRegister from "@main/register/TrayRegister";
// Main-process Register module

import MenuBuilder from "@main/builder/MenuBuilder";
import TrayBuilder from "@main/builder/TrayBuilder";
import AlarmManager from "@main/manager/AlarmManager";
// Main-process module

import SettingWindow from "@windows/SettingWindow";
// Main-process Window modules

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

  private loadMenuRegister() {
    /** 메뉴 빌더 instance */
    const menuBuilder = new MenuBuilder();
    /** 시스템 Tray 빌더 instance */
    const trayBuilder = new TrayBuilder();
    return new TrayRegister(menuBuilder, trayBuilder);
  }

  private onActivate() {
    SettingWindow.getInstance().resetWindow();
  }

  private onWindowAllClosed() {}

  public run() {
    this.registerLogManager(app.isPackaged);
    this.registerProcessHandle();
    this.initModules();

    const trayRegister = this.loadMenuRegister();

    const alarmManager = new AlarmManager();
    alarmManager.registerHandler();

    app
      .on("ready", () => {
        /** `App`이 실행 후 준비 상태가 될 때 callback */
        this.onActivate();
        usingRegister([
          new AutoUpdate(),
          new SingleInstance(),
          new ThemeSelector(),
          trayRegister,
        ]); // 모듈 등록 후 메모리에 저장
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

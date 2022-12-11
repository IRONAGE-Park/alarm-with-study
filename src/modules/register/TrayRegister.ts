import { app } from "electron";
// Electron Main-process module

import Register from "@main/register/_Register";
// Main-process module

import MenuBuilder from "@main/builder/MenuBuilder";
import TrayBuilder from "@main/builder/TrayBuilder";

// Main-process Builder module

class TrayRegister extends Register {
  constructor(
    private menuBuilder: MenuBuilder,
    private trayBuilder: TrayBuilder
  ) {
    super();
  }

  public registerListener(): void {
    this.registerTray();
  }

  public registerTray() {
    this.trayBuilder.createTray();
    this.changeMenu();
  }

  public changeMenu() {
    /** 기기 탐지기 instance */
    const menu = this.menuBuilder.buildTrayMenu();
    this.trayBuilder.setTrayMenu(menu);

    if (app.dock) {
      app.dock.setMenu(menu);
    }
  }
}

export default TrayRegister;

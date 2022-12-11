import { type NativeImage, Tray, Menu, nativeImage } from "electron";
// Electron Main-process modules

import SettingWindow from "@windows/SettingWindow";
// windows

import AppIcon from "@assets/icons/tray.png";
// assets

/**
 * `Main-process`
 *
 * '시스템 Tray 빌더'
 *
 * App에 간접적으로 접근할 수 있는 시스템 Tray를 생성함
 */
class TrayBuilder {
  /** 시스템 Tray 객체 */
  private tray: Tray | null;
  /** Tray에서 사용할 Icon */
  private readonly icon: NativeImage;

  /**
   * '`Tray Manager` 생성자'
   */
  constructor() {
    this.tray = null; // App 실행 시 tray는 null 값을 가짐
    this.icon = nativeImage.createFromDataURL(AppIcon);
  }

  /**
   * '시스템 Tray에 메뉴를 삽입하는 Method'
   *
   * @param contextMenu Tray 메뉴
   */
  public setTrayMenu(contextMenu: Menu): void {
    this.tray?.setContextMenu(contextMenu);
    // Tray에 메뉴를 삽입함
  }

  public createTray(): void {
    this.tray = new Tray(this.icon);
    // 새로운 Tray를 생성함
    this.tray.on("double-click", () =>
      SettingWindow.getInstance().resetWindow()
    );
    // Tray 더블 클릭 시 Setting Window를 염
    this.tray.setToolTip("Alarm With Study");
    // Tray에 hover 하면 나타날 툴팁 제공
  }
}

export default TrayBuilder;

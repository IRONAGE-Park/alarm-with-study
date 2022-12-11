import { Menu, shell } from "electron";
import SettingWindow from "@windows/SettingWindow";

// Electron Main-process module

/**
 * `Main-process`
 *
 * '메뉴 빌더'
 *
 * `App`에서 할 수 있는 모든 메뉴들을 생성함
 *
 * Tray 메뉴, BrowserWindow 메뉴 등을 관리
 */
class MenuBuilder {
  /**
   * '`App`에서 사용할 Tray 메뉴를 생성하는 Method'
   *
   * @returns Tray 메뉴
   */
  public buildTrayMenu(): Menu {
    const contextMenu = Menu.buildFromTemplate([
      { type: "separator" }, // 간격 분할 생성
      {
        label: "지원 센터",
        click: () =>
          shell.openExternal(
            "https://github.com/IRONAGE-Park/alarm-with-study"
          ),
      },
      { type: "separator" }, // 간격 분할 생성
      {
        label: "열기",
        click: () => SettingWindow.getInstance().resetWindow(), // `Setting Window`를 염
      },
      { label: "종료", type: "normal", role: "quit" }, // `App`을 종료함
    ]);
    Menu.setApplicationMenu(contextMenu);
    return contextMenu;
  }
}

export default MenuBuilder;

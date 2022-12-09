import { ipcMain, nativeTheme } from "electron";
import st from "electron-settings";
// Electron Main-process module

import Register from "@main/register/_Register";
// Main-process module

import RendererSender from "@libs/RendererSender";
// common libraries

import RegisterGuard from "@guards/Register.guard";
// guards

import {
  ACTION_GET_THEME,
  ACTION_CHANGE_THEME,
  ACTION_CHANGED_THEME,
} from "@bridges/theme-selector";
// messages

/** `App Theme`의 setting key 이름 */
const STORE_THEME_STATE = "theme_state";

/**
 * `Main-process`
 *
 * '`App Theme` 선택 모듈'
 *
 * `Renderer-process`에서의 `App Theme`(라이트 / 다크 모드)를
 * 관리하는 클래스
 *
 * `App Theme`의 상태 변화를 감지하여 `Renderer-process`와 통신
 */
class ThemeSelector extends Register {
  /** '`App Theme` 선택 모듈 생성자' */
  constructor() {
    super();
    const savedSystemTheme = st.getSync(STORE_THEME_STATE);
    nativeTheme.themeSource = RegisterGuard.isSystemTheme(savedSystemTheme)
      ? savedSystemTheme
      : "system";
  }

  /**
   * '`App Theme` 설정 변경을 적용하는 Function'
   *
   * @param theme 변경할 `App Theme`
   */
  public applyTheme(theme: "system" | "dark" | "light"): void {
    nativeTheme.themeSource = theme;
    st.setSync(STORE_THEME_STATE, nativeTheme.themeSource);

    // 변경 후 변경된 `App Theme`를 전송
    RendererSender.sendAll(ACTION_CHANGED_THEME, nativeTheme.themeSource);
  }

  public registerListener(): void {
    ipcMain.handle(ACTION_GET_THEME, () => {
      // 현재 `App Theme` 상태를 가져오는 event handler
      return nativeTheme.themeSource;
    });

    ipcMain.handle(
      ACTION_CHANGE_THEME,
      (event, theme: "system" | "dark" | "light") => {
        // `App Theme`를 변경하는 event handler
        this.applyTheme(theme);
      }
    );
  }
}

export default ThemeSelector;

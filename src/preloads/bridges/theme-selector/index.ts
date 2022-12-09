/** `App Theme` message 선택자 */
export const THEME_SELECTOR = "theme" as const;

/** `App Theme`를 갖고 오는 Action */
export const ACTION_GET_THEME = `${THEME_SELECTOR}:get-theme` as const;
/** `App Theme`를 변경하는 Action */
export const ACTION_CHANGE_THEME = `${THEME_SELECTOR}:change-theme` as const;
/** `App Theme`가 변경됐을 때 발생하는 Action */
export const ACTION_CHANGED_THEME = `${THEME_SELECTOR}:changed-theme` as const;
// bridge messages

/** `App Theme` 선택 API의 Function interface */
export interface ThemeSelectorApi {
  /**
   * 현재 `App Theme` 가져오는 Function
   */
  getStatus: () => Promise<"system" | "dark" | "light">;

  /**
   * `App Theme`를 변경하는 Function
   *
   * @param theme 변경할 `App Theme`
   */
  changeState: (theme: "system" | "dark" | "light") => Promise<void>;

  /**
   * `App Theme`가 변경될 때마다 받을 `IPC Listener`를 등록하는 Function
   *
   * @param receiveTheme 변경 시 실행할 callback Function
   */
  registThemeDetector: (
    /**
     * `App Theme` 변경 시 실행할 callback Function으로
     * 매개변수로 변경된 `App Theme`가 넘어옴
     *
     * @param theme 변경된 `App Theme`
     */
    receiveTheme: (theme: "system" | "dark" | "light") => void
  ) => Promise<void>;
}

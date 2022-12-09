/** `Main Window` 상태 message 선택자 */
export const MAIN_WINDOW = "main_window" as const;

/** `Main Window`를 숨기는 Action */
export const ACTION_HIDE_WINDOW = `${MAIN_WINDOW}:hide` as const;
/** `Main Window`를 닫는 Action */
export const ACTION_CLOSE_WINDOW = `${MAIN_WINDOW}:close` as const;
// bridge messages

/** `Main Window State` API의 Function interface */
export interface MainWindowApi {
  /** `BrowserWindow` 숨김 요청 Function */
  hide: () => Promise<void>;
  /** `BrowserWindow` 닫는 요청 Function */
  close: () => Promise<void>;
}

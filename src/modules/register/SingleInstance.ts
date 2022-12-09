import { app } from "electron";
// Electron Main-process module

import MainWindow from "@windows/MainWindow";
// Main-process windows

import Register from "@main/register/_Register";
// Main-process module

/**
 * `Main-process`
 *
 * '`App` 동시 실행 방지 모듈'
 *
 * `App`이 동시에 두 개 중복 실행될 수 없도록 처리
 */
class SingleInstance extends Register {
  /** 이 `App`이 기본 인스턴스인지 확인 */
  readonly gotTheLock: boolean = app.requestSingleInstanceLock();

  public registerListener(): void {
    if (!this.gotTheLock) {
      // 이미 `App`이 실행되어 있으면 새로운 `App` 종료
      app.quit();
      app.exit();
    } else {
      // 두 번째 `App` 실행 시 이벤트 발생
      app.on("second-instance", () => {
        MainWindow.getInstance().resetWindow();
      });
    }
  }
}

export default SingleInstance;

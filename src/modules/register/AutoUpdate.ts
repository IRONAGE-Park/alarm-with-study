import { dialog } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
// Electron Main-process module

import Register from "@main/register/_Register";
// Main-process module

/**
 * `Main-process`
 *
 * '자동 업데이트 감지 모듈'
 *
 * Github 서버에 새로운 릴리즈가 인식되면
 * 다운로드 받은 후 자동 업데이트를 알림을 띄우고
 * 업데이트 진행함
 */
class AutoUpdate extends Register {
  public registerListener(): void {
    autoUpdater.logger = log;

    // autoUpdater.on("checking-for-update", info => {});
    autoUpdater.on("update-available", info => {
      console.info("Update available.", info);
    });
    // autoUpdater.on("update-not-available", info => {});
    autoUpdater.on("error", err => {
      console.error(`Error in auto-updater. ${err}`);
    });

    autoUpdater.on("download-progress", progressObj => {
      let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
      logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`;
      logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`;
      console.info(logMessage);
    });
    autoUpdater.on("update-downloaded", info => {
      console.info("Update downloaded", info);

      const option = {
        type: "question",
        buttons: ["업데이트", "취소"],
        defaultId: 0,
        message:
          "새로운 업데이트가 발견되었습니다. Alarm With Study를 업데이트 하시겠습니까?",
      };
      const btnIndex = dialog.showMessageBoxSync(option);
      if (btnIndex === 0) {
        autoUpdater.quitAndInstall();
      }
    });
    autoUpdater.checkForUpdatesAndNotify();
  }
}

export default AutoUpdate;

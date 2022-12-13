import { shell } from "electron";
// Electron Main-process modules

import NotificationBuilder from "@main/builder/NotificationBuilder";
// builders

import AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
// commanders

class RestAlarmCommander extends AlarmCommander {
  ring(): void {
    shell.beep();
    NotificationBuilder.build(
      "쉴 시간입니다. 쉬다가 졸면 게이.",
      "잠이... 온다구요?"
    );
  }
}

export default RestAlarmCommander;

import { shell } from "electron";
// Electron Main-process modules

import AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
import NotificationBuilder from "@main/builder/NotificationBuilder";

// interfaces

class StudyAlarmCommander extends AlarmCommander {
  ring(): void {
    shell.beep();
    NotificationBuilder.build(
      "공부할 시간입니다. 안하면 게이.",
      "공부해~~~~~~~~~~~~~~~~~~"
    );
  }
}

export default StudyAlarmCommander;

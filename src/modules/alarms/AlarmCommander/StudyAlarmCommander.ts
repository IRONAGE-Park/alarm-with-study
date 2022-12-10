import { shell } from "electron";
// Electron Main-process modules

import AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
// interfaces

class StudyAlarmCommander extends AlarmCommander {
  ring(): void {
    console.log("study time");
    shell.beep();
  }
}

export default StudyAlarmCommander;

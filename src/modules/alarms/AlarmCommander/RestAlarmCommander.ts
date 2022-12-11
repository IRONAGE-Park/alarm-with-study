import AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
import NotificationBuilder from "@main/builder/NotificationBuilder";
// interfaces

class RestAlarmCommander extends AlarmCommander {
  ring(): void {
    NotificationBuilder.build(
      "쉴 시간입니다. 쉬다가 졸면 게이.",
      "잠이... 온다구요?"
    );
  }
}

export default RestAlarmCommander;

import AlarmCommander, {
  AlarmCommanderType,
} from "@main/alarms/AlarmCommander/AlarmCommander";
import RestAlarmCommander from "@main/alarms/AlarmCommander/RestAlarmCommander";
import StudyAlarmCommander from "@main/alarms/AlarmCommander/StudyAlarmCommander";

export function createAlarmCommander(
  type: AlarmCommanderType,
  duration: number
): AlarmCommander {
  switch (type) {
    case "rest":
      return new RestAlarmCommander(duration);
    case "study":
    default:
      return new StudyAlarmCommander(duration);
  }
}

export function convertAlarmCommanderToType(
  alarmCommander: AlarmCommander
): AlarmCommanderType {
  if (alarmCommander instanceof RestAlarmCommander) {
    return "rest";
  }
  return "study";
}

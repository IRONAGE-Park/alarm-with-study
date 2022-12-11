import uuid from "uuid";
import AlarmCommander, {
  AlarmCommanderType,
} from "@main/alarms/AlarmCommander/AlarmCommander";
import RestAlarmCommander from "@main/alarms/AlarmCommander/RestAlarmCommander";
import StudyAlarmCommander from "@main/alarms/AlarmCommander/StudyAlarmCommander";

export function createAlarmCommander(
  type: AlarmCommanderType,
  duration: number
): AlarmCommander {
  const id = uuid.v4();
  switch (type) {
    case "rest":
      return new RestAlarmCommander(id, duration);
    case "study":
    default:
      return new StudyAlarmCommander(id, duration);
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

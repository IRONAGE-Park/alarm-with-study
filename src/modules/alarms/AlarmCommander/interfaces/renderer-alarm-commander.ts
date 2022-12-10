import AlarmCommander, {
  AlarmCommanderType,
} from "@main/alarms/AlarmCommander/AlarmCommander";
// interfaces

import { convertAlarmCommanderToType } from "@main/alarms/AlarmCommander/utils";

interface RendererAlarmCommander {
  type: AlarmCommanderType;
  duration: number;
  spareTime: number;
}

export default RendererAlarmCommander;

export function convertAlarmCommanderToRenderer(
  alarmCommander: AlarmCommander
): RendererAlarmCommander {
  return {
    type: convertAlarmCommanderToType(alarmCommander),
    duration: alarmCommander.duration,
    spareTime: alarmCommander.spareTime,
  };
}

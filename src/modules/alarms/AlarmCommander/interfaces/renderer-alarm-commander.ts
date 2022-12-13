import type AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
import type { AlarmCommanderType } from "@main/alarms/AlarmCommander/AlarmCommander";
// interfaces

import { convertAlarmCommanderToType } from "@main/alarms/AlarmCommander/utils";
// converter functions

interface RendererAlarmCommander {
  id: string;
  type: AlarmCommanderType;
  duration: number;
  spareTime: number;
}

export default RendererAlarmCommander;

export function convertAlarmCommanderToRenderer(
  alarmCommander: AlarmCommander
): RendererAlarmCommander {
  return {
    id: alarmCommander.id,
    type: convertAlarmCommanderToType(alarmCommander),
    duration: alarmCommander.duration,
    spareTime: alarmCommander.spareTime,
  };
}

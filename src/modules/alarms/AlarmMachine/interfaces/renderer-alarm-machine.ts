import type RendererAlarmCommander from "@main/alarms/AlarmCommander/interfaces/renderer-alarm-commander";
import AlarmMachine, {
  type AlarmMachineType,
  type AlarmState,
} from "@main/alarms/AlarmMachine/AlarmMachine";
// interfaces

import { convertAlarmCommanderToRenderer } from "@main/alarms/AlarmCommander/interfaces/renderer-alarm-commander";
// converter functions

interface RendererAlarmState extends Omit<AlarmState, "timer"> {
  timer: boolean;
}

interface RendererAlarmMachine {
  id: string;
  type: AlarmMachineType;
  commanders: RendererAlarmCommander[];
  state: RendererAlarmState;
}

export default RendererAlarmMachine;

export function convertAlarmMachineToRenderer(
  alarmMachine: AlarmMachine
): RendererAlarmMachine {
  return {
    id: alarmMachine.id,
    type: alarmMachine.type,
    commanders: alarmMachine.commanders.map(convertAlarmCommanderToRenderer),
    state: {
      index: alarmMachine.state.index,
      timer: !!alarmMachine.state.timer,
    },
  };
}

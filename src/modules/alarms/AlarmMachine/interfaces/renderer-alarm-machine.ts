import type RendererAlarmCommander from "@main/alarms/AlarmCommander/interfaces/renderer-alarm-commander";
import type AlarmMachine from "@main/alarms/AlarmMachine/AlarmMachine";
import type {
  AlarmMachineType,
  AlarmState,
} from "@main/alarms/AlarmMachine/AlarmMachine";
// interfaces

import { convertAlarmCommanderToRenderer } from "@main/alarms/AlarmCommander/interfaces/renderer-alarm-commander";
// converter functions

export interface RendererAlarmState extends Omit<AlarmState, "timer"> {
  timer: boolean;
}

interface RendererAlarmMachine {
  id: string;
  type: AlarmMachineType;
  commanders: RendererAlarmCommander[];
  state: RendererAlarmState;
}

export default RendererAlarmMachine;

export function convertAlarmMachineStateToRenderer(
  alarmState: AlarmState
): RendererAlarmState {
  return {
    id: alarmState.id,
    timer: !!alarmState.timer,
  };
}

export function convertAlarmMachineToRenderer(
  alarmMachine: AlarmMachine
): RendererAlarmMachine {
  return {
    id: alarmMachine.id,
    type: alarmMachine.type,
    commanders: alarmMachine.commanders.map(convertAlarmCommanderToRenderer),
    state: convertAlarmMachineStateToRenderer(alarmMachine.state),
  };
}

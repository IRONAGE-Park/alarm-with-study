import type CreateAlarmMachineDto from "@main/alarms/AlarmMachine/interfaces/create-alarm-machine-dto";
import type UpdateAlarmMachineStateDto from "@main/alarms/AlarmMachine/interfaces/update-alarm-machine-state-dto";
import type RendererAlarmMachine from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";
import type { NextAction } from "@main/alarms/AlarmMachine/AlarmMachine";
// interfaces

/** `Alarm` message 선택자 */
export const ALARM = "alarm" as const;

export const ACTION_CREATE_ALARM = `${ALARM}:create-alarm` as const;
export const ACTION_START_ALARM = `${ALARM}:start-alarm` as const;
export const ACTION_STOP_ALARM = `${ALARM}:stop-alarm` as const;
export const ACTION_DELETE_ALARM = `${ALARM}:delete-alarm` as const;
export const ACTION_GET_ALARMS = `${ALARM}:get-alarms` as const;
export const ACTION_CHECK_RING = `${ALARM}:check-ring` as const;
export const ACTION_RING = `${ALARM}:ring` as const;
export const ACTION_THICK = `${ALARM}:thick` as const;
export const ACTION_CHANGED_ALARM_MACHINE_STATE =
  `${ALARM}:changed-state` as const;
// messages

export interface AlarmApi {
  create(
    alarmMachine: CreateAlarmMachineDto,
    isImmediately: boolean
  ): Promise<RendererAlarmMachine>;
  start(id: string): Promise<string>;
  stop(id: string): Promise<string>;
  delete(id: string): Promise<string>;
  get alarms(): Promise<RendererAlarmMachine[]>;
  checkRing(id: string, nextAction: NextAction): Promise<string>;
  registerRingDetector(receiveRing: (id: string) => void): void;
  registerThickDetector(
    receiveThick: (
      machineId: string,
      commanderId: string,
      spareTime: number
    ) => void
  ): void;
  registerChangedAlarmMachineStateDetector(
    receiveAlarmMachineState: (
      id: string,
      updateAlarmMachineStateDto: UpdateAlarmMachineStateDto
    ) => void
  ): void;
}

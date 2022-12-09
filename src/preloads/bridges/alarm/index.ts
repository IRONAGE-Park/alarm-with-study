import type {
  AlarmMachine,
  CreateAlarmMachine,
  NextAction,
} from "@main/register/AlarmManager";
// types

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
// messages

export interface AlarmApi {
  create(
    alarmMachine: CreateAlarmMachine,
    isImmediately: boolean
  ): Promise<AlarmMachine>;
  start(id: string): Promise<void>;
  stop(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  get alarms(): Promise<AlarmMachine[]>;
  checkRing(id: string, nextAction: NextAction): Promise<void>;
  registerRingDetector(receiveRing: (id: string) => void): void;
  registerThickDetector(
    receiveThick: (id: string, spareTime: number) => void
  ): void;
}

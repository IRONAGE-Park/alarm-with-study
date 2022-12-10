import uuid from "uuid";
// Node.js modules

import { ipcMain } from "electron";
// Electron Main-process modules

import AlarmMachine from "@main/alarms/AlarmMachine/AlarmMachine";

import {
  ACTION_CREATE_ALARM,
  ACTION_START_ALARM,
  ACTION_STOP_ALARM,
  ACTION_DELETE_ALARM,
  ACTION_GET_ALARMS,
  ACTION_RING,
  ACTION_CHECK_RING,
} from "@bridges/alarm";
import CreateAlarmMachineDto from "@main/alarms/AlarmMachine/interfaces/create-alarm-machine-dto";
import RendererAlarmMachine, {
  convertAlarmMachineToRenderer,
} from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";
import { createAlarmCommander } from "@main/alarms/AlarmCommander/utils";

class AlarmManager {
  constructor(private alarms: AlarmMachine[] = []) {}

  startAlarmMachine(id: string): void {
    const alarmMachine = this.alarms.find(alarm => alarm.id === id);
    if (alarmMachine === undefined) {
      throw new Error("Not found Alarm!");
    }
    alarmMachine.start();
  }

  registerHandler(): void {
    ipcMain.handle(
      ACTION_CREATE_ALARM,
      (
        _,
        { type, macro }: CreateAlarmMachineDto,
        isImmediately: boolean
      ): RendererAlarmMachine => {
        const alarmCommanders = macro.map(({ type, duration }) =>
          createAlarmCommander(type, duration)
        );
        const alarmMachine = new AlarmMachine(uuid.v4(), type, alarmCommanders);
        this.alarms = this.alarms.concat(alarmMachine);

        if (isImmediately) {
          alarmMachine.start();
        }

        console.log(convertAlarmMachineToRenderer(alarmMachine));
        return convertAlarmMachineToRenderer(alarmMachine);
      }
    );

    ipcMain.handle(ACTION_START_ALARM, () => {});

    ipcMain.handle(ACTION_STOP_ALARM, () => {});

    ipcMain.handle(ACTION_DELETE_ALARM, () => {});

    ipcMain.handle(ACTION_GET_ALARMS, () => this.alarms);
  }
}

export default AlarmManager;

import CreateAlarmMachineDto from "@main/alarms/AlarmMachine/interfaces/create-alarm-machine-dto";
import RendererAlarmMachine, {
  convertAlarmMachineStateToRenderer,
  convertAlarmMachineToRenderer,
} from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";
// interfaces

import uuid from "uuid";
// Node.js modules

import { ipcMain } from "electron";
// Electron Main-process modules

import RendererSender from "@libs/RendererSender";
// common libraries

import AlarmMachine, {
  NextAction,
} from "@main/alarms/AlarmMachine/AlarmMachine";
// machines

import { createAlarmCommander } from "@main/alarms/AlarmCommander/utils";
// converter functions

import {
  ACTION_CREATE_ALARM,
  ACTION_START_ALARM,
  ACTION_STOP_ALARM,
  ACTION_DELETE_ALARM,
  ACTION_GET_ALARMS,
  ACTION_CHECK_RING,
  ACTION_CHANGED_ALARM_MACHINE_STATE,
} from "@bridges/alarm";
// messages

class AlarmManager {
  constructor(private alarms: AlarmMachine[] = []) {}

  createAlarmMachine({
    type,
    commanders,
  }: CreateAlarmMachineDto): AlarmMachine {
    const alarmCommanders = commanders.map(({ type, duration }) =>
      createAlarmCommander(type, duration)
    );
    const alarmMachine = new AlarmMachine(uuid.v4(), type, alarmCommanders);
    this.alarms = this.alarms.concat(alarmMachine);

    return alarmMachine;
  }

  startAlarmMachine(id: string): void {
    const alarmMachine = this.findAlarmMachine(id);
    alarmMachine.start();
  }

  stopAlarmMachine(id: string): void {
    const alarmMachine = this.findAlarmMachine(id);
    alarmMachine.stop();
  }

  deleteAlarmMachine(id: string): void {
    this.alarms = this.alarms.filter(alarm => {
      if (alarm.id === id) {
        alarm.deleteTimer();
        return false;
      }
      return true;
    });
  }

  nextAction(id: string, nextAction: NextAction): string {
    const alarmMachine = this.findAlarmMachine(id);
    alarmMachine.closeAlarmWindow();

    alarmMachine.nextStep();
    if (nextAction === "start") {
      alarmMachine.start();
    }
    RendererSender.sendAll(
      ACTION_CHANGED_ALARM_MACHINE_STATE,
      id,
      convertAlarmMachineStateToRenderer(alarmMachine.state)
    );
    return alarmMachine.currentCommanderId();
  }

  registerHandler(): void {
    ipcMain.handle(
      ACTION_CREATE_ALARM,
      (
        _,
        createAlarmMachineDto: CreateAlarmMachineDto,
        isImmediately: boolean
      ): RendererAlarmMachine => {
        const alarmMachine = this.createAlarmMachine(createAlarmMachineDto);

        if (isImmediately) {
          alarmMachine.start();
        }

        return convertAlarmMachineToRenderer(alarmMachine);
      }
    );

    ipcMain.handle(ACTION_START_ALARM, (_, id: string): string => {
      this.startAlarmMachine(id);

      return id;
    });

    ipcMain.handle(ACTION_STOP_ALARM, (_, id: string): string => {
      this.stopAlarmMachine(id);

      return id;
    });

    ipcMain.handle(ACTION_DELETE_ALARM, (_, id: string): string => {
      this.deleteAlarmMachine(id);

      return id;
    });

    ipcMain.handle(ACTION_GET_ALARMS, (): RendererAlarmMachine[] =>
      this.alarms.map(convertAlarmMachineToRenderer)
    );

    ipcMain.handle(
      ACTION_CHECK_RING,
      (_, id: string, nextAction: NextAction): string => {
        return this.nextAction(id, nextAction);
      }
    );
  }

  private findAlarmMachine(id: string): AlarmMachine {
    const alarmMachine = this.alarms.find(alarm => alarm.id === id);
    if (alarmMachine === undefined) {
      throw new Error("Not found Alarm!");
    }
    return alarmMachine;
  }
}

export default AlarmManager;

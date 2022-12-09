import uuid from "uuid";
// Node.js modules

import { ipcMain } from "electron";
// Electron Main-process modules

import Register from "@main/register/_Register";
//  Main-process modules

import {
  ACTION_CREATE_ALARM,
  ACTION_STOP_ALARM,
  ACTION_DELETE_ALARM,
  ACTION_GET_ALARMS,
  ACTION_RING,
  ACTION_CHECK_RING,
} from "@bridges/alarm";
import RendererSender from "@libs/RendererSender";

export type CreateAlarmMachine = Omit<AlarmMachine, "id" | "state">;

export type NextAction = "start" | "stop";

class AlarmManager extends Register {
  constructor(private alarms: AlarmMachine[] = []) {
    super("Alarm Manager");
  }

  startAlarmMachine(id: string): void {
    const alarmMachine = this.alarms.find(alarm => alarm.id === id);
    if (alarmMachine === undefined) {
      throw new Error("Not found Alarm!");
    }
    const { macro, state, type } = alarmMachine;
    const { index: currentIndex } = state;
    if (currentIndex === null) {
      throw new Error("Ended Alarm Machine!");
    }

    const command = macro[currentIndex];
    if (command === undefined) {
      throw new Error("Not found Command!");
    }

    state.timer = setTimeout(() => {
      if (state.index === null) {
        return;
      }

      RendererSender.sendAll(ACTION_RING, () => {});

      state.index++;
      if (++state.index >= macro.length) {
        if (type === "infinite") {
          state.index = 0;
        } else {
          state.index = null;
        }
      }
    }, command.duration);
  }

  registerListener(): void {
    ipcMain.handle(
      ACTION_CREATE_ALARM,
      (_, alarmMachine: CreateAlarmMachine): AlarmMachine => {
        const newAlarmMachine: AlarmMachine = {
          ...alarmMachine,
          id: uuid.v4(),
          state: {
            index: 0,
            timer: null,
          },
        };
        this.alarms = this.alarms.concat(newAlarmMachine);
        return newAlarmMachine;
      }
    );
  }
}

export default AlarmManager;

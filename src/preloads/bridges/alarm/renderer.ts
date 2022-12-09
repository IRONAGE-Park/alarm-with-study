import type {
  AlarmMachine,
  CreateAlarmMachine,
  NextAction,
} from "@main/register/AlarmManager";
// types

import { contextBridge, ipcRenderer } from "electron";
// Electron Renderer-process module

import {
  type AlarmApi,
  ALARM,
  ACTION_CREATE_ALARM,
  ACTION_START_ALARM,
  ACTION_STOP_ALARM,
  ACTION_DELETE_ALARM,
  ACTION_GET_ALARMS,
  ACTION_CHECK_RING,
  ACTION_RING,
  ACTION_THICK,
} from "@bridges/alarm/index";
// messages

const alarmApi: AlarmApi = {
  create(
    alarmMachine: CreateAlarmMachine,
    isImmediately: boolean
  ): Promise<AlarmMachine> {
    return ipcRenderer.invoke(ACTION_CREATE_ALARM, alarmMachine, isImmediately);
  },
  start(id: string): Promise<void> {
    return ipcRenderer.invoke(ACTION_START_ALARM, id);
  },
  stop(id: string): Promise<void> {
    return ipcRenderer.invoke(ACTION_STOP_ALARM, id);
  },
  delete(id: string): Promise<void> {
    return ipcRenderer.invoke(ACTION_DELETE_ALARM, id);
  },
  get alarms(): Promise<AlarmMachine[]> {
    return ipcRenderer.invoke(ACTION_GET_ALARMS);
  },
  checkRing(id: string): Promise<void> {
    return ipcRenderer.invoke(ACTION_CHECK_RING, id);
  },
  registerRingDetector(receiveRing: (id: string) => void): void {
    ipcRenderer.on(ACTION_RING, (_, id: string) => {
      receiveRing(id);
    });
  },
  registerThickDetector(receiveThick: (id: string, spareTime: number) => void) {
    ipcRenderer.on(ACTION_THICK, (_, id: string, spareTime: number) => {
      receiveThick(id, spareTime);
    });
  },
};
contextBridge.exposeInMainWorld(ALARM, alarmApi);
import type CreateAlarmMachineDto from "@main/alarms/AlarmMachine/interfaces/create-alarm-machine-dto";
import type UpdateAlarmMachineStateDto from "@main/alarms/AlarmMachine/interfaces/update-alarm-machine-state-dto";
import type RendererAlarmMachine from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";
// interfaces

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
  ACTION_CHANGED_ALARM_MACHINE_STATE,
} from "@bridges/alarm/index";
// messages

const alarmApi: AlarmApi = {
  create(
    alarmMachine: CreateAlarmMachineDto,
    isImmediately: boolean
  ): Promise<RendererAlarmMachine> {
    return ipcRenderer.invoke(ACTION_CREATE_ALARM, alarmMachine, isImmediately);
  },
  start(id: string): Promise<string> {
    return ipcRenderer.invoke(ACTION_START_ALARM, id);
  },
  stop(id: string): Promise<string> {
    return ipcRenderer.invoke(ACTION_STOP_ALARM, id);
  },
  delete(id: string): Promise<string> {
    return ipcRenderer.invoke(ACTION_DELETE_ALARM, id);
  },
  get alarms(): Promise<RendererAlarmMachine[]> {
    return ipcRenderer.invoke(ACTION_GET_ALARMS);
  },
  checkRing(id: string, nextAction): Promise<string> {
    return ipcRenderer.invoke(ACTION_CHECK_RING, id, nextAction);
  },
  registerRingDetector(receiveRing: (id: string) => void): void {
    ipcRenderer.on(ACTION_RING, (_, id: string) => {
      receiveRing(id);
    });
  },
  registerThickDetector(
    receiveThick: (
      machineId: string,
      commanderId: string,
      spareTime: number
    ) => void
  ) {
    ipcRenderer.on(
      ACTION_THICK,
      (_, machineId: string, commanderId: string, spareTime: number) => {
        receiveThick(machineId, commanderId, spareTime);
      }
    );
  },
  registerChangedAlarmMachineStateDetector(
    receiveAlarmMachineState: (
      id: string,
      updateAlarmMachineStateDto: UpdateAlarmMachineStateDto
    ) => void
  ) {
    ipcRenderer.on(
      ACTION_CHANGED_ALARM_MACHINE_STATE,
      (
        _,
        id: string,
        updateAlarmMachineStateDto: UpdateAlarmMachineStateDto
      ) => {
        receiveAlarmMachineState(id, updateAlarmMachineStateDto);
      }
    );
  },
};
contextBridge.exposeInMainWorld(ALARM, alarmApi);

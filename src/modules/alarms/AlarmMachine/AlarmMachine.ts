import AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
import AlarmWindow from "@windows/AlarmWindow";
import RendererSender from "@libs/RendererSender";
import { ACTION_THICK } from "@bridges/alarm";
// commanders

export type AlarmMachineType = "once" | "infinite";
export type NextAction = "start" | "stop";

export interface AlarmState {
  index: number | null;
  timer: NodeJS.Timer | null;
}

class AlarmMachine {
  private alarmWindow: AlarmWindow | null = null;
  public state: AlarmState;
  constructor(
    public id: string,
    public type: AlarmMachineType,
    public commanders: AlarmCommander[]
  ) {
    this.state = {
      index: 0,
      timer: null,
    };
  }

  start(): void {
    const currentState = this.state;
    if (currentState.index === null) {
      throw new Error("this Machine is End!");
    }
    const currentCommander = this.commanders[currentState.index];

    if (currentCommander === undefined) {
      throw new Error("Not Found Commander!");
    }
    currentCommander.initializeSpareTime();
    currentState.timer = setInterval(() => {
      console.log("thick", currentCommander.spareTime);
      if (currentCommander.spareTime <= 0) {
        currentCommander.initializeSpareTime();
        currentCommander.ring();
        this.alarmWindow = new AlarmWindow(this.id);
        this.stop();
      }
      currentCommander.thick();
      RendererSender.sendAll(ACTION_THICK, this.id, currentCommander.spareTime);
    }, 1000);
  }

  stop(): void {
    if (this.state.timer === null) {
      throw new Error("Already stopped!");
    }
    clearInterval(this.state.timer);
    this.state.timer = null;
  }
}

export default AlarmMachine;

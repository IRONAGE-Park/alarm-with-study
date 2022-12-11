import AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
import AlarmWindow from "@windows/AlarmWindow";
import alarmWindow from "@windows/AlarmWindow";
import RendererSender from "@libs/RendererSender";
import { ACTION_THICK } from "@bridges/alarm";
import { convertAlarmCommanderToType } from "@main/alarms/AlarmCommander/utils";
// commanders

export type AlarmMachineType = "once" | "infinite";
export type NextAction = "start" | "stop";

export interface AlarmState {
  id: string | null;
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
      id: this.firstCommander().id,
      timer: null,
    };
  }

  start(): void {
    const commander = this.currentCommander();

    commander.initializeSpareTime();
    this.state.timer = setInterval(() => {
      commander.thick();
      RendererSender.sendAll(
        ACTION_THICK,
        this.id,
        commander.id,
        commander.spareTime
      );

      if (commander.spareTime <= 0) {
        this.timeOver(commander);
      }
    }, 1000);
  }

  nextStep(): void {
    if (this.state.timer) {
      this.stop();
    }
    if (this.state.id === null) {
      throw new Error("Cannot next step!");
    }
    const currentCommanderIndex = this.commanders.findIndex(
      commander => commander.id === this.state.id
    );

    if (currentCommanderIndex === -1) {
      throw new Error("Not exist current commander!");
    }

    const nextCommanderIndex = currentCommanderIndex + 1;
    if (nextCommanderIndex >= this.commanders.length) {
      if (this.type === "infinite") {
        this.state.id = this.firstCommander().id;
      } else {
        this.state.id = null;
      }
      return;
    }
    this.state.id = this.commanders[nextCommanderIndex].id;
  }

  stop(): void {
    if (this.state.timer === null) {
      throw new Error("Already stopped!");
    }
    clearInterval(this.state.timer);
    this.state.timer = null;
  }

  timeOver(commander: AlarmCommander): void {
    commander.initializeSpareTime();
    commander.ring();
    if (alarmWindow) {
      this.closeAlarmWindow();
    }
    this.alarmWindow = new AlarmWindow(
      this.id,
      convertAlarmCommanderToType(commander)
    );
    this.stop();
  }

  closeAlarmWindow(): void {
    this.alarmWindow?.window.close();
    this.alarmWindow = null;
  }

  currentCommanderId(): string {
    const commander = this.currentCommander();
    return commander.id;
  }

  private currentCommander(): AlarmCommander {
    const currentState = this.state;
    if (currentState.id === null) {
      throw new Error("this Machine is End!");
    }
    const current = this.commanders.find(
      commander => commander.id === currentState.id
    );

    if (current === undefined) {
      throw new Error("Not Found Commander!");
    }
    return current;
  }

  private firstCommander(): AlarmCommander {
    const firstCommander = this.commanders[0];
    if (firstCommander === undefined) {
      throw new Error("Empty commanders!");
    }

    return firstCommander;
  }
}

export default AlarmMachine;

export type AlarmCommanderType = "study" | "rest";

abstract class AlarmCommander {
  abstract ring(): void;

  constructor(public id: string, public duration: number) {}

  spareTime: number = 0;

  initializeSpareTime(): void {
    this.spareTime = this.duration * 60;
  }

  thick(): void {
    this.spareTime--;
  }
}

export default AlarmCommander;

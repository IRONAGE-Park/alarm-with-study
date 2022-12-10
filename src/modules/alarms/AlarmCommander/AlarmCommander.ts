export type AlarmCommanderType = "study" | "rest";
abstract class AlarmCommander {
  abstract ring(): void;
  constructor(public duration: number) {}
  spareTime: number = 0;

  initializeSpareTime(): void {
    this.spareTime = this.duration;
  }
  thick(): void {
    this.spareTime--;
  }
}

export default AlarmCommander;
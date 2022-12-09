type AlarmMachineType = "once" | "infinite";

export interface AlarmMachine {
  id: string;
  type: AlarmMachineType;
  macro: AlarmCommand[];
  state: {
    index: number | null;
    timer: NodeJS.Timer | null;
  };
}

interface IAlarmMachine {
  id: string;
  macro: AlarmCommand[];
}

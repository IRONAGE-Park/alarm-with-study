import type { AlarmCommanderType } from "@main/alarms/AlarmCommander/AlarmCommander";
// interfaces

interface CreateAlarmCommanderDto {
  type: AlarmCommanderType;
  duration: number;
}

export default CreateAlarmCommanderDto;

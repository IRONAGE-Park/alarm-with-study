import type CreateAlarmCommanderDto from "@main/alarms/AlarmCommander/interfaces/create-alarm-commander-dto";
import type { AlarmMachineType } from "@main/alarms/AlarmMachine/AlarmMachine";
// interfaces

interface CreateAlarmMachineDto {
  type: AlarmMachineType;
  commanders: CreateAlarmCommanderDto[];
}

export default CreateAlarmMachineDto;

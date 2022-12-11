import styled from "@emotion/styled";
import RendererAlarmMachine from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";

interface ViewAlarmMachineItemProps {
  alarmMachine: RendererAlarmMachine;
}

const ViewAlarmMachineItem = ({ alarmMachine }: ViewAlarmMachineItemProps) => {
  return <StyleItem>{alarmMachine.type}</StyleItem>;
};

interface ViewAlarmMachineListProps {
  alarmMachines: RendererAlarmMachine[];
}

export const ViewAlarmMachineList = ({
  alarmMachines,
}: ViewAlarmMachineListProps) => {
  return (
    <StyleList>
      {alarmMachines.map(alarmMachine => (
        <ViewAlarmMachineItem
          key={alarmMachine.id}
          alarmMachine={alarmMachine}
        />
      ))}
    </StyleList>
  );
};

export default ViewAlarmMachineItem;

const StyleList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyleItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 160px;
  height: 140px;
`;

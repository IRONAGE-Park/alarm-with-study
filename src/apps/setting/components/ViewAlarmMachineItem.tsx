import styled from "@emotion/styled";
import RendererAlarmMachine from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";
import {
  ViewCurrentAlarmCommanderItem,
  ViewNextAlarmCommanderItem,
} from "@renderer/setting/components/ViewAlarmCommanderItem";
import { ButtonBase } from "@mui/material";

interface ViewAlarmMachineItemProps {
  alarmMachine: RendererAlarmMachine;
}

const ViewAlarmMachineItem = ({ alarmMachine }: ViewAlarmMachineItemProps) => {
  const currentAlarmCommander = alarmMachine.commanders.find(
    commander => commander.id === alarmMachine.state.id
  );
  const nextAlarmCommanderIndex =
    alarmMachine.commanders.findIndex(
      commander => commander.id === alarmMachine.state.id
    ) + 1;
  const nextAlarmCommander = alarmMachine.commanders[nextAlarmCommanderIndex];

  return (
    <StyleItem>
      <StyleTypeText>
        {alarmMachine.type === "once" ? "한 번 실행" : "무한 반복"}
      </StyleTypeText>
      {currentAlarmCommander && (
        <ViewCurrentAlarmCommanderItem alarmCommander={currentAlarmCommander} />
      )}
      <ViewNextAlarmCommanderItem alarmCommander={nextAlarmCommander} />
      <StyleExecuteButton onClick={() => window.alarm.start(alarmMachine.id)}>
        실행
      </StyleExecuteButton>
    </StyleItem>
  );
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

  margin-top: -10px;
  margin-left: -10px;
`;

const StyleItem = styled.li`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 180px;

  background: ${({ theme }) => theme.color.grayScale.gray300};

  padding: 10px;
  border-radius: 10px;

  ${({ theme }) => theme.style.boxShadow.dropdownEmphasis};

  margin-top: 10px;
  margin-left: 10px;
`;

const StyleTypeText = styled.p`
  width: 100%;

  color: ${({ theme }) => theme.color.grayScale.basic.mediumBlack};
  font-size: 12px;

  text-align: right;
`;

const StyleExecuteButton = styled(ButtonBase)`
  width: 100%;
  height: 32px;

  margin-top: 8px;

  background: ${({ theme }) => theme.color.primary.blue200};

  border-radius: 10px;
`;

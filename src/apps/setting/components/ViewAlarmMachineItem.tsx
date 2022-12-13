import UpdateAlarmMachineStateDto from "@main/alarms/AlarmMachine/interfaces/update-alarm-machine-state-dto";
// interfaces

import RendererAlarmMachine from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";
// types

import { ButtonBase } from "@mui/material";
// React modules

import SvgIcon from "@renderer/common/components/SvgIcon";
import {
  ViewCurrentAlarmCommanderItem,
  ViewNextAlarmCommanderItem,
} from "@renderer/setting/components/ViewAlarmCommanderItem";
// components

import styled from "@emotion/styled";
// styles

interface ViewAlarmMachineItemProps {
  alarmMachine: RendererAlarmMachine;
  onChangeState: (
    updateAlarmMachineStateDto: UpdateAlarmMachineStateDto
  ) => void;
  onDelete: () => void;
}

const ViewAlarmMachineItem = ({
  alarmMachine,
  onChangeState,
  onDelete,
}: ViewAlarmMachineItemProps) => {
  const currentAlarmCommander = alarmMachine.commanders.find(
    commander => commander.id === alarmMachine.state.id
  );
  const nextAlarmCommanderIndex =
    alarmMachine.commanders.findIndex(
      commander => commander.id === alarmMachine.state.id
    ) + 1;
  const nextAlarmCommander = alarmMachine.commanders[nextAlarmCommanderIndex];

  const onClick = async () => {
    const result = await (alarmMachine.state.timer
      ? window.alarm.stop(alarmMachine.id)
      : window.alarm.start(alarmMachine.id));

    if (result === alarmMachine.id) {
      onChangeState({ timer: !alarmMachine.state.timer });
    }
  };

  const onClickDelete = async () => {
    const result = await window.alarm.delete(alarmMachine.id);
    if (result === alarmMachine.id) {
      onDelete();
    }
  };

  return (
    <StyleItem>
      <StyleTopLine>
        <SvgIcon icon="Delete" onClick={onClickDelete} />
        <StyleTypeText>
          {alarmMachine.type === "once" ? "한 번 실행" : "무한 반복"}
        </StyleTypeText>
      </StyleTopLine>
      {currentAlarmCommander && (
        <ViewCurrentAlarmCommanderItem alarmCommander={currentAlarmCommander} />
      )}
      <ViewNextAlarmCommanderItem alarmCommander={nextAlarmCommander} />
      <StyleExecuteButton onClick={onClick}>
        {alarmMachine.state.timer ? "정지" : "실행"}
      </StyleExecuteButton>
    </StyleItem>
  );
};

interface ViewAlarmMachineListProps {
  alarmMachines: RendererAlarmMachine[];
  onChangeState: (
    id: string,
    updateAlarmMachineStateDto: UpdateAlarmMachineStateDto
  ) => void;
  onDelete: (id: string) => void;
}

export const ViewAlarmMachineList = ({
  alarmMachines,
  onChangeState,
  onDelete,
}: ViewAlarmMachineListProps) => {
  return (
    <StyleList>
      {alarmMachines.map(alarmMachine => (
        <ViewAlarmMachineItem
          key={alarmMachine.id}
          alarmMachine={alarmMachine}
          onChangeState={param => onChangeState(alarmMachine.id, param)}
          onDelete={() => onDelete(alarmMachine.id)}
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

const StyleTopLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
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

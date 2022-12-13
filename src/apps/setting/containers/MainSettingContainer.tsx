import type CreateAlarmMachineDto from "@main/alarms/AlarmMachine/interfaces/create-alarm-machine-dto";
import type UpdateAlarmMachineStateDto from "@main/alarms/AlarmMachine/interfaces/update-alarm-machine-state-dto";
// interfaces

import type RendererAlarmMachine from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";
// types

import { useState, useEffect } from "react";
// React modules

import CreateAlarmBox from "@renderer/setting/components/inputs/CreateAlarmBox";
import { ViewAlarmMachineList } from "@renderer/setting/components/ViewAlarmMachineItem";
// components

import styled from "@emotion/styled";
// styles

const MainSettingContainer = () => {
  const [alarmMachines, setAlarmMachines] = useState<RendererAlarmMachine[]>(
    []
  );

  const onClick = async (
    createAlarmMachineDto: CreateAlarmMachineDto,
    isImmediately: boolean
  ) => {
    const alarm = await window.alarm.create(
      createAlarmMachineDto,
      isImmediately
    );
    setAlarmMachines(prev => prev.concat(alarm));
  };

  const onChangeState = (
    id: string,
    updateAlarmMachineStateDto: UpdateAlarmMachineStateDto
  ) => {
    setAlarmMachines(prev =>
      prev.map(alarmMachine =>
        alarmMachine.id === id
          ? {
              ...alarmMachine,
              state: {
                ...alarmMachine.state,
                ...updateAlarmMachineStateDto,
              },
            }
          : alarmMachine
      )
    );
  };

  const onDelete = (id: string) => {
    setAlarmMachines(prev =>
      prev.filter(alarmMachine => alarmMachine.id !== id)
    );
  };

  const onChangeSpareTime = (
    machineId: string,
    commanderId: string,
    spareTime: number
  ) => {
    setAlarmMachines(prev =>
      prev.map(alarmMachine =>
        alarmMachine.id === machineId
          ? {
              ...alarmMachine,
              commanders: alarmMachine.commanders.map(commander =>
                commander.id === commanderId
                  ? {
                      ...commander,
                      spareTime: spareTime,
                    }
                  : commander
              ),
            }
          : alarmMachine
      )
    );
  };

  useEffect(() => {
    window.alarm.alarms.then(alarms => {
      setAlarmMachines(() => alarms);
    });
    window.alarm.registerThickDetector(onChangeSpareTime);
    window.alarm.registerRingDetector(id =>
      onChangeState(id, { timer: false })
    );
    window.alarm.registerChangedAlarmMachineStateDetector(onChangeState);
  }, []);

  return (
    <StyleContainer>
      <StyleTopArea>
        <CreateAlarmBox onClick={onClick} />
      </StyleTopArea>
      <StyleBottomArea>
        {alarmMachines.length === 0 ? (
          <StyleEmptyMessage>등록된 알람이 없습니다.</StyleEmptyMessage>
        ) : (
          <ViewAlarmMachineList
            alarmMachines={alarmMachines}
            onChangeState={onChangeState}
            onDelete={onDelete}
          />
        )}
      </StyleBottomArea>
    </StyleContainer>
  );
};

export default MainSettingContainer;

const StyleContainer = styled.article`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.color.grayScale.coolGray200};

  padding: 10px;
`;

const StyleTopArea = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const StyleBottomArea = styled.section`
  position: fixed;
  bottom: 0;
  left: 20px;

  width: calc(100% - 40px);
  height: 200px;

  padding: 24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  ${({ theme }) => theme.style.boxShadow.dropdownEmphasis};

  background: ${({ theme }) => theme.color.grayScale.gray200};

  overflow-y: auto;
`;

const StyleEmptyMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-size: 24px;
  font-weight: 500;
`;

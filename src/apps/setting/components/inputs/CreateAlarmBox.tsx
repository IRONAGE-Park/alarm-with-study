import type CreateAlarmMachineDto from "@main/alarms/AlarmMachine/interfaces/create-alarm-machine-dto";

import styled from "@emotion/styled";
import { useState } from "react";
import { ButtonBase } from "@mui/material";
import Checkbox from "@renderer/common/components/Checkbox";
import CreateCommanderBox from "@renderer/setting/components/inputs/CreateCommanderBox";
import { AlarmCommanderType } from "@main/alarms/AlarmCommander/AlarmCommander";

interface CreateAlarmBoxProps {
  onClick: (
    createAlarmMachineDto: CreateAlarmMachineDto,
    isImmediately: boolean
  ) => void;
}

const CreateAlarmBox = ({ onClick }: CreateAlarmBoxProps) => {
  const [alarmMachine, setAlarmMachine] = useState<CreateAlarmMachineDto>({
    type: "once",
    commanders: [
      {
        type: "study",
        duration: 60,
      },
      { type: "rest", duration: 60 },
    ],
  });
  const [isImmediately, setIsImmediately] = useState(false);

  const onChangeType = () => {
    setAlarmMachine(prev => ({
      ...prev,
      type: prev.type === "once" ? "infinite" : "once",
    }));
  };

  const onClickAddCommander = () => {
    setAlarmMachine(prev => ({
      ...prev,
      commanders: prev.commanders.concat({
        type: "study",
        duration: 0,
      }),
    }));
  };

  const onChangeCommanderDuration = (duration: number, index: number) => {
    setAlarmMachine(prev => ({
      ...prev,
      commanders: prev.commanders.map((commander, idx) =>
        index === idx
          ? {
              ...commander,
              duration: duration,
            }
          : commander
      ),
    }));
  };

  const onChangeCommanderType = (type: AlarmCommanderType, index: number) => {
    setAlarmMachine(prev => ({
      ...prev,
      commanders: prev.commanders.map((commander, idx) =>
        index === idx
          ? {
              ...commander,
              type: type,
            }
          : commander
      ),
    }));
  };

  const isInfinite = alarmMachine.type === "infinite";

  return (
    <StyleBox>
      <StyleListArea>
        {alarmMachine.commanders.map((commander, index) => (
          <CreateCommanderBox
            key={index}
            index={index + 1}
            alarmCommander={commander}
            onChangeDuration={duration =>
              onChangeCommanderDuration(duration, index)
            }
            onChangeType={type => onChangeCommanderType(type, index)}
          />
        ))}
      </StyleListArea>
      <StyleAddButton onClick={onClickAddCommander}>
        커맨드 추가하기
      </StyleAddButton>
      <StyleCheckboxArea>
        <Checkbox
          id="infinite"
          checked={isInfinite}
          onChange={onChangeType}
          label="무한 반복 실행하기"
        />
        <Checkbox
          id="immediately"
          checked={isImmediately}
          onChange={e => setIsImmediately(e.target.checked)}
          label="등록 즉시 실행하기"
        />
      </StyleCheckboxArea>
      <StyleButton onClick={() => onClick(alarmMachine, isImmediately)}>
        등록하기
      </StyleButton>
    </StyleBox>
  );
};

export default CreateAlarmBox;

const StyleBox = styled.div`
  width: 300px;
  height: 444px;

  background: ${({ theme }) => theme.color.grayScale.coolGray100};

  padding: 10px;
  border-radius: 10px;
  ${({ theme }) => theme.style.boxShadow.dropdownEmphasis};
`;

const StyleListArea = styled.div`
  width: 100%;
  height: 300px;

  overflow: auto;
`;

const StyleAddButton = styled(ButtonBase)`
  width: 100%;
  height: 32px;

  color: ${({ theme }) => theme.fontColor.primary};

  background: ${({ theme }) => theme.color.primary.blue300};

  border-radius: 10px;
`;

const StyleCheckboxArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin: 10px 0;
`;

const StyleButton = styled(ButtonBase)`
  width: 100%;
  height: 48px;

  color: ${({ theme }) => theme.fontColor.primary};

  background: ${({ theme }) => theme.color.primary.blue500};

  border-radius: 10px;
`;

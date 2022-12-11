import type CreateAlarmCommanderDto from "@main/alarms/AlarmCommander/interfaces/create-alarm-commander-dto";

import styled from "@emotion/styled";
import { AlarmCommanderType } from "@main/alarms/AlarmCommander/AlarmCommander";
import Toggle from "@renderer/common/components/Toggle";

interface CreateCommanderBoxProps {
  index: number;
  alarmCommander: CreateAlarmCommanderDto;
  onChangeDuration: (duration: number) => void;
  onChangeType: (type: AlarmCommanderType) => void;
}

const CreateCommanderBox = ({
  index,
  alarmCommander,
  onChangeDuration,
  onChangeType: handleChangeType,
}: CreateCommanderBoxProps) => {
  const isRest = alarmCommander.type === "rest";

  const onChangeType = () => {
    handleChangeType(isRest ? "study" : "rest");
  };

  return (
    <StyleBox>
      <StyleNumbering>
        {index}번째 알람 - {alarmCommander.type === "study" ? "공부" : "휴식"}
      </StyleNumbering>
      <StyleInputArea>
        <StyleDurationInput
          type="number"
          value={alarmCommander.duration}
          onChange={e => onChangeDuration(parseInt(e.target.value))}
        />
        분
      </StyleInputArea>
      <StyleInputArea>
        공부 <Toggle checked={isRest} onChange={onChangeType} /> 휴식
      </StyleInputArea>
    </StyleBox>
  );
};

export default CreateCommanderBox;

const StyleBox = styled.div`
  width: 100%;

  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.grayScale.coolGray200};

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

const StyleNumbering = styled.p``;

const StyleInputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40px;

  padding: 5px;
`;

const StyleDurationInput = styled.input`
  width: 200px;
  height: 100%;

  margin: 0 10px;
  padding: 0 10px;

  text-align: right;

  border-radius: 10px;
`;

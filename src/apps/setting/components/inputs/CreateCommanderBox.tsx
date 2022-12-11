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
        <StyleTypeText>공부</StyleTypeText>
        <Toggle checked={isRest} onChange={onChangeType} />
        <StyleTypeText>휴식</StyleTypeText>
      </StyleInputArea>
    </StyleBox>
  );
};

export default CreateCommanderBox;

const StyleBox = styled.div`
  width: 100%;

  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.primary.blue200};

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

const StyleNumbering = styled.p`
  font-size: 14px;
`;

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

  margin: 0 4px;
  padding: 0 4px;

  text-align: right;

  border-radius: 10px;
`;

const StyleTypeText = styled.span`
  font-size: 12px;
  margin: 0 6px;
`;

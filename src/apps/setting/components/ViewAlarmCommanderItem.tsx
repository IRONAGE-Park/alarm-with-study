import styled from "@emotion/styled";

import RendererAlarmCommander from "@main/alarms/AlarmCommander/interfaces/renderer-alarm-commander";
import { AlarmCommanderType } from "@main/alarms/AlarmCommander/AlarmCommander";

interface ViewAlarmCommanderItemProps {
  alarmCommander: RendererAlarmCommander;
}

const ViewAlarmCommanderItem = ({
  alarmCommander,
}: ViewAlarmCommanderItemProps) => {
  return <>{alarmCommander.spareTime}</>;
};

interface ViewAlarmCommanderListProps {
  alarmCommanders: RendererAlarmCommander[];
}

export const ViewAlarmCommanderList = ({
  alarmCommanders,
}: ViewAlarmCommanderListProps) => {
  return (
    <>
      {alarmCommanders.map(alarmCommander => (
        <ViewAlarmCommanderItem alarmCommander={alarmCommander} />
      ))}
    </>
  );
};

const formatSpareTime = (time: number) =>
  `${Math.floor(time / 60)}분 ${time % 60}초`;
const formatType = (type: AlarmCommanderType) =>
  type === "study" ? "공부" : "휴식";

export const ViewCurrentAlarmCommanderItem = ({
  alarmCommander,
}: ViewAlarmCommanderItemProps) => {
  return (
    <StyleBox>
      <StyleCurrentSpareTime>
        {formatSpareTime(alarmCommander.spareTime)} 남음
      </StyleCurrentSpareTime>
      <StyleCurrentType>
        {formatType(alarmCommander.type)} 시간입니다.
      </StyleCurrentType>
    </StyleBox>
  );
};

export const ViewNextAlarmCommanderItem = ({
  alarmCommander,
}: Partial<ViewAlarmCommanderItemProps>) => {
  return (
    <StyleNextMessage>
      다음 알람은{" "}
      {alarmCommander ? (
        <>
          {formatType(alarmCommander.type)} 시간 {alarmCommander.duration}분
          입니다.
        </>
      ) : (
        <>없습니다.</>
      )}
    </StyleNextMessage>
  );
};

export default ViewAlarmCommanderItem;

const StyleBox = styled.div`
  margin-top: 10px;
`;

const StyleCurrentSpareTime = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const StyleCurrentType = styled.p`
  font-size: 14px;
  text-align: right;
`;

const StyleNextMessage = styled.p`
  color: ${({ theme }) => theme.color.grayScale.basic.mediumBlack};
  font-size: 10px;
  font-weight: 500;
  text-align: right;
`;

import RendererAlarmCommander from "@main/alarms/AlarmCommander/interfaces/renderer-alarm-commander";

interface ViewAlarmCommanderItemProps {
  alarmCommander: RendererAlarmCommander;
}
const ViewAlarmCommanderItem = ({
  alarmCommander,
}: ViewAlarmCommanderItemProps) => {
  return <>{alarmCommander.duration}</>;
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

export default ViewAlarmCommanderItem;

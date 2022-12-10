import { useEffect, useState } from "react";
import RendererAlarmMachine from "@main/alarms/AlarmMachine/interfaces/renderer-alarm-machine";

const MainSettingContainer = () => {
  const [alarmMachineList, setAlarmMachineList] = useState<
    RendererAlarmMachine[]
  >([]);

  const onClick = async () => {
    const alarm = await window.alarm.create(
      {
        type: "infinite",
        macro: [
          {
            type: "study",
            duration: 1,
          },
          {
            type: "rest",
            duration: 60,
          },
        ],
      },
      true
    );
    setAlarmMachineList(prev => prev.concat(alarm));
  };

  useEffect(() => {
    window.alarm.alarms.then(alarms => {
      setAlarmMachineList(() => alarms);
    });
  }, []);

  console.log(alarmMachineList);

  return <p onClick={onClick}>임의 추가하기</p>;
};

export default MainSettingContainer;

import AlarmCommander from "@main/alarms/AlarmCommander/AlarmCommander";
// interfaces

class RestAlarmCommander extends AlarmCommander {
  ring(): void {
    console.log("rest time");
  }
}

export default RestAlarmCommander;

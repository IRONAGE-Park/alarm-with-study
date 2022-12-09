type AlarmCommandType = "study" | "rest";

interface AlarmCommand {
  type: AlarmCommandType;
  duration: number;
}

class AlarmCommander {}

export default AlarmCommander;

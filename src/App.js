import "./App.css";
import Alarm from "./alarm/Alarm.js";
import ContextAlarm from "./alarm/contextProvider";


function Clock() {
  return (
    <div className="alarm">
      <ContextAlarm>
        <Alarm />
      </ContextAlarm>
    </div>
  );
}
export default Clock;

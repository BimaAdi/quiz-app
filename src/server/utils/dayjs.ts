import dayjs from "dayjs";
import DayJSUtc from "dayjs/plugin/utc";
import DayJsTimezone from "dayjs/plugin/timezone";

dayjs.extend(DayJSUtc);
dayjs.extend(DayJsTimezone);

export default dayjs;

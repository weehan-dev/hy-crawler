import dateUtils from "./utils/dateUtils";
import moment from "moment-timezone";

const today = new Date();

const ret = dateUtils.getTargetDateList(today);
console.log(ret);

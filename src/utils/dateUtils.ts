import moment from "moment-timezone";

class DateUtils {
  private static instance: DateUtils;
  constructor() {
    if (DateUtils.instance) return DateUtils.instance;
    DateUtils.instance = this;
    return this;
  }

  getTargetDateList(today: Date) {
    const targetDateList = [...Array(7).keys()].map(after => {
      const originDate: Date = new Date(today);
      const afterDate: Date = this.getAfterDay(originDate, after);
      const formattedLocalTime: string = this.getFormattedLocalTime(afterDate);
      return [...formattedLocalTime.split("-").map(Number), formattedLocalTime];
    });

    return targetDateList;
  }

  getFormattedLocalTime(date: Date) {
    const localTime = moment(date)
      .tz("Asia/Tokyo")
      .format("YYYY-MM-DD");

    return localTime;
  }

  getAfterDay(originDate: Date, after: number): Date {
    const temp = new Date().setDate(originDate.getDate() + after);
    const ret = new Date(temp);

    return ret;
  }
}

export default new DateUtils();

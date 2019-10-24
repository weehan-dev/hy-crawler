export default {
  SOURCE: {
    BASE_URL: "www.hanyang.ac.kr",
    NO_IMAGE: "/html-repositories/images/custom/food/no-img.jpg",
    DIET: {
      학생식당: "https://www.hanyang.ac.kr/web/www/re1",
      교직원식당: "https://www.hanyang.ac.kr/web/www/re2",
      사랑방: "https://www.hanyang.ac.kr/web/www/re3",
      신교직원식당: "https://www.hanyang.ac.kr/web/www/re4",
      신학생식당: "https://www.hanyang.ac.kr/web/www/re5",
      제1생활관식당: "https://www.hanyang.ac.kr/web/www/re6",
      제2생활관식당: "https://www.hanyang.ac.kr/web/www/re7",
      행원파크: "https://www.hanyang.ac.kr/web/www/re8"
    },
    SCHEDULE: "https://www.hanyang.ac.kr/web/www/-33",
    LIBRARY: "https://lib.hanyang.ac.kr/#/smuf/seat/status"
  },
  QUERY: {
    DIET: {
      getDate: (year: number, month: number, date: number): string => {
        return `?p_p_id=foodView_WAR_foodportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&_foodView_WAR_foodportlet_sFoodDateDay=${date}&_foodView_WAR_foodportlet_sFoodDateYear=${year}&_foodView_WAR_foodportlet_action=view&_foodView_WAR_foodportlet_sFoodDateMonth=${month -
          1}`;
      }
    }
  }
};

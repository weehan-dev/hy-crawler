import axios from 'axios';
import cheerio from 'cheerio';
import configs from '../config';
import utils from '../utils';

const {
  URLS: {SOURCE, QUERY}
} = configs;

export default async () => {
  const today = new Date();
  const targetDates = [...Array(7).keys()].map(after => {
    const originDate = new Date(today);

    originDate.setDate(today.getDate() + after);
    return originDate
      .toLocaleDateString()
      .split('. ')
      .map(Number);
  });

  const url =
    SOURCE.DIET.학생식당 +
    QUERY.DIET.getDate(targetDates[1][0], targetDates[1][1], targetDates[1][2]);

  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  const sections = $('#messhall1').find('.in-box');
  sections.map((idx, ele) => {
    const section = $(ele);
    let type: string = section.find('h4.d-title2').text();
    if (!['조식', '중식', '석식', '중식/석식', '분식'].includes(type)) return; // 공통찬 제외

    const datas = section.find('.bbs ul li.span3 a.thumbnail');
    const diets = datas.map((idx, card) => {
      const cardElement = $(card);
      const imageUrl = cardElement.find('img').attr('src');
      const price = cardElement.find('p.price').text();
      let meal = cardElement.find('h3').text();
      console.log(meal);
      return {
        imageUrl,
        price,
        meal
      };
    });

    type = utils.dataConverter(type);
  });

  /*
  for (let restaurant in SOURCE.DIET) {
    for (let afterDay in targetDates) {
      const [year, month, date] = targetDates[afterDay];
      const url =
        SOURCE.DIET[restaurant] + QUERY.DIET.getDate(year, month, date);
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);
      const dataList = [];
      console.log(
        $('.foodView-view')
          .find('.in-box')
          .html()
      );
      
        .find('.in-box')
        .each((idx, ele) => {
          dataList.push(ele);
        });

      
      dataList.map((idx, ele) => {
        const type = $(ele)
          .find('.d-title2')
          .text();
        const dietInformationList = $(ele).children('ul .span3');
        console.log(type, dietInformationList);
      });
      */
};

import coreUtils from "../utils";
import dietCrawlingUtils from "../utils/dietCrawlingUtils";
import { typesAndDietsList, typeAndDiets, DietData } from "../types/crawler";
import { DietSelect } from "../types/entity";
import getDietModel from "../models/modelDiet";
import configs from "../config";

const {
  URLS: { SOURCE, QUERY }
} = configs;

export default {
  getTypesAndDiets: async (
    [year, month, date, rawDate]: (number | string)[],
    restaurant: string
  ): Promise<typesAndDietsList> => {
    const url =
      SOURCE.DIET[restaurant] +
      QUERY.DIET.getDate(year as number, month as number, date as number);
    const $ = await coreUtils.getCheerioObject(url);

    const ret = [];
    const sections = $("#messhall1").find(".in-box");

    sections.each((idx, ele) => {
      const dayMealData: typeAndDiets = {};
      const section = $(ele);

      let type: string = section
        .find("h4.d-title2")
        .eq(0)
        .text();

      if (!["조식", "중식", "석식", "중식/석식", "분식"].includes(type)) return; // 공통찬 제외
      type = dietCrawlingUtils.dataConverter(type);

      const datas = section.find(".bbs ul li.span3 a.thumbnail");

      const diets: DietData[] = [];
      datas.each((idx, card) => {
        const cardElement = $(card);
        const cardData = dietCrawlingUtils.getDietsCardData(cardElement);
        diets.push(cardData);
      });

      dayMealData.type = type;
      dayMealData.diets = JSON.stringify(diets);
      dayMealData.date = rawDate as string;
      ret.push(dayMealData);
    });
    return ret;
  },

  saveOrOverwriteData: async (data: DietSelect): Promise<void> => {
    const modelDiet = getDietModel();
    const valid = coreUtils.parseDietData(data);

    if (valid) {
      const { result } = await modelDiet.createOrOverwrite(data);
    }
  }
};

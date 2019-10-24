import utils from "../utils";
import dietCrawlingUtils from "../utils/dietCrawlingUtils";
import { typesAndDietsList, typeAndDiets, DietData } from "../types/crawler";
import { DietSelect } from "../types/entity";
import getDietModel from "../models/modelDiet";

export default {
  getTypesAndDiets: async (
    [year, month, date, rawDate]: (number | string)[],
    restaurant: string
  ): Promise<typesAndDietsList> => {
    const $ = await dietCrawlingUtils.getCheerioObject(
      [year, month, date],
      restaurant
    );

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
      type = utils.dataConverter(type);

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
    const valid = utils.parseDietData(data);

    if (valid) await modelDiet.createOrOverwrite(data);
  }
};

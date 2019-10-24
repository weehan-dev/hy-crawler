import $ from "cheerio";
import { DietSelect } from "../types/entity";
import configs from "../config";
import moment from "moment-timezone";

const {
  URLS: { SOURCE }
} = configs;

const NO_DATA = "NO_DATA";

export default {
  dataConverter: (type: string): string => {
    switch (type) {
      case "조식":
        return "breakfast";
      case "중식":
        return "lunch";
      case "석식":
        return "dinner";
      case "중식/석식":
        return "lunch/dinner";
      case "분식":
        return "snack";
    }
  },

  parseDietData: (data: DietSelect): boolean => {
    if (!data.type) return false;
    if (!data.diets) return false;
    const parsedDiets = JSON.parse(data.diets);
    if (!data.diets && !data.diets.length) return false;

    parsedDiets.map(diet => {
      if (diet.imageUrl === SOURCE.NO_IMAGE) diet.imageUrl = NO_DATA;
      if (!diet.mealEng) diet.mealEng = NO_DATA;
      if (!diet.mealKor) diet.mealKor = NO_DATA;
      if (!diet.price) diet.price = NO_DATA;
    });

    data.diets = JSON.stringify(parsedDiets);

    return true;
  },

  isDietsChanged: (existData: DietSelect, newData: DietSelect): boolean => {
    for (let i in existData) if (existData[i] !== newData[i]) return true;
    return false;
  }
};

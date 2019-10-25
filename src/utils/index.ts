import cheerio from "cheerio";
import { DietSelect } from "../types/entity";
import axios from "axios";
import configs from "../config";

const {
  URLS: { SOURCE }
} = configs;

const NO_DATA = "NO_DATA";

export default {
  getCheerioObject: async function(url: string) {
    const html = await axios.get(url);
    console.log(html.data);
    const $ = cheerio.load(html.data, { decodeEntities: false });
    return $;
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
    if (existData.diets === newData.diets) return false;
    return false;
  }
};

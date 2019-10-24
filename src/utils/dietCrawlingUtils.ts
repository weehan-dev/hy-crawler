import cheerio from "cheerio";
import axios from "axios";
import configs from "../config";

const {
  URLS: { SOURCE, QUERY }
} = configs;

class DataCrawlingUtils {
  private static instance;
  constructor() {
    if (DataCrawlingUtils.instance) return DataCrawlingUtils.instance;
    DataCrawlingUtils.instance = this;
    return this;
  }

  async getCheerioObject([year, month, date], restaurant: string) {
    const url =
      SOURCE.DIET[restaurant] +
      QUERY.DIET.getDate(year as number, month as number, date as number);
    const html = await axios.get(url);
    const $ = cheerio.load(html.data, { decodeEntities: false });

    return $;
  }

  getDietsCardData(cardElement) {
    const imageUrl = cardElement.find("img").attr("src");
    const price = cardElement.find("p.price").text();
    const rawMeal = cardElement
      .find("h3")
      .eq(0)
      .html();

    const [mealKor, mealEng] = rawMeal
      .split("<br>")
      .map(m => m.trim())
      .filter(Boolean);

    return {
      imageUrl,
      price,
      mealKor,
      mealEng
    };
  }
}

export default new DataCrawlingUtils();

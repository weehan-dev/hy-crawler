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

  dataConverter(type: string): string {
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

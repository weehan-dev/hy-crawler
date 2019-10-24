import moment from "moment-timezone";
import { createConnection } from "typeorm";

import dietCrawler from "./services/dietCrawler";
import configs from "./config";
import { DietSelect } from "./types/entity";
import ormConfig from "./ormConfig";
import dateUtils from "./utils/dateUtils";
const {
  URLS: { SOURCE }
} = configs;

type dataType = DietSelect[];

const dietCrawlingApp = async () => {
  const today: Date = new Date();
  const targetDateList = dateUtils.getTargetDateList(today);
  const targetData: dataType = [];

  for (let restaurant in SOURCE.DIET) {
    await Promise.all(
      targetDateList.map(async (day, afterDay) => {
        const typesAndDiets = await dietCrawler.getTypesAndDiets(
          day as (number | string)[],
          restaurant
        );

        typesAndDiets.map(typeDiets => {
          const restaurantQueries: DietSelect = { restaurant, afterDay };
          restaurantQueries.type = typeDiets.type;
          restaurantQueries.diets = typeDiets.diets;
          restaurantQueries.date = typeDiets.date as string;
          targetData.push(restaurantQueries);
        });
      })
    );
  }
  console.log(targetData);
  await Promise.all(
    targetData.map(async data => {
      await dietCrawler.saveOrOverwriteData(data);
    })
  );
};
createConnection({ ...ormConfig }).then(() => {
  dietCrawlingApp();
});

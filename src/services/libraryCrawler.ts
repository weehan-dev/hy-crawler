import configs from "../config";
import coreUtils from "../utils";
import modelLibrary from "../models/modelLibrary";
import libraryCrawlingUtils from "../utils/libraryCrawlingUtils";
import { LibrarySelect } from "src/types/entity";
import Nightmare from "nightmare";
const nightmare = new Nightmare();
const {
  URLS: { SOURCE }
} = configs;

/**
 * 열람실 좌석 정보 -> 5분마다 한 번씩 크롤링
 */

export default {
  getLibraryStatus: async function(): Promise<LibrarySelect[]> {
    const url = SOURCE.LIBRARY;
    const rowSelector = "tr.ikc-item";
    await nightmare
      .goto(url)
      .wait(".ikc-tablelist.ikc-seat-status tr.ikc-item")
      .evaluate((selector: string) => {
        const rows = document.querySelector(selector);
      }, rowSelector);

    const $ = await coreUtils.getCheerioObject(url);
    const ret = [];
    libraries.map((idx, ele) => {
      console.log($(ele).text());
      const nowData = libraryCrawlingUtils.getDataFromRow(ele, $);
      console.log(nowData);
      ret.push(nowData);
    });

    return ret;
  },

  updateLibraryData: async function(newData: LibrarySelect): Promise<void> {
    await modelLibrary().createOrOverwrite(newData);
  }
};

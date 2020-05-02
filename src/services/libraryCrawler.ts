import axios from "axios";
import configs from "../config";
import modelLibrary from "../models/modelLibrary";
import { ICrawler } from "../interfaces/ICrawler";

const {
  URLS: { SOURCE }
} = configs;

/**
 * 열람실 좌석 정보 -> 5분마다 한 번씩 크롤링
 */

export default {
  getLibraryStatus: async function (): Promise<ICrawler[]> {
    const url = SOURCE.LIBRARY;
    const {
      data: {
        data: { list }
      }
    }: { data: { data: { list: [ICrawler] } } } = await axios.get(url);
    return list;
  },

  updateLibraryData: async function (newData: ICrawler): Promise<void> {
    await modelLibrary().createOrOverwrite(newData);
  }
};

import libraryCrawler from "../services/libraryCrawler";

const libraryCrawlingApp = async () => {
  const dataList = await libraryCrawler.getLibraryStatus();
  await Promise.all(
    dataList.map(data => libraryCrawler.updateLibraryData(data))
  );
};

export default libraryCrawlingApp;

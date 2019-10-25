import { LibrarySelect } from "../types/entity";

class LibraryCrawlingUtils {
  private static instance: LibraryCrawlingUtils;
  constructor() {
    if (LibraryCrawlingUtils.instance) return LibraryCrawlingUtils.instance;
    LibraryCrawlingUtils.instance = this;
    return this;
  }

  getDataFromRow(row: Document): LibrarySelect {
    const location = $(row)
      .find('[ng-bind="s.name"]')
      .eq(0)
      .text();
    const wholeSeat = $(row)
      .find('[ng-bind="s.activeTotal"]')
      .eq(0)
      .text();
    const usingSeat = $(row)
      .find('[ng-bind="s.occupied"')
      .eq(0)
      .text();
    const leftSeat = $(row)
      .find("strong.ick-seat-status-usable")
      .eq(0)
      .text();
    const usagePercentage = $(row)
      .find('progress[ng-value="s.rate"]')
      .eq(0)
      .val();

    const ret = {
      location,
      wholeSeat: Number(wholeSeat),
      usingSeat: Number(usingSeat),
      leftSeat: Number(leftSeat),
      usagePercentage: Number(usagePercentage)
    };

    return ret;
  }
}

export default new LibraryCrawlingUtils();

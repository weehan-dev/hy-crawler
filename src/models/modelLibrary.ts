import Library from "./entities/Library.entity";
import { getRepository, Repository } from "typeorm";
import { ModelBoolReturn } from "../types/model";
import { ICrawler } from "../interfaces/ICrawler";

class LibraryModel {
  private db: Repository<Library>;
  private static instance: LibraryModel;
  private getErrorLog(fn: string) {
    return `${fn} has error in Library model`;
  }
  constructor() {
    if (LibraryModel.instance) return LibraryModel.instance;
    this.db = getRepository(Library);
    LibraryModel.instance = this;
    return this;
  }

  async createOrOverwrite(data: ICrawler): Promise<ModelBoolReturn> {
    const argument = {
      location: data.name,
      wholeSeat: data.activeTotal,
      usingSeat: data.occupied,
      leftSeat: data.available,
      usagePercentage: (data.occupied / data.available) * 100
    };
    try {
      const existLibrary = await this.db.findOne({ location: data.name });
      if (!existLibrary) throw new Error("create new");

      await this.db.update(existLibrary, argument);
      return { result: false };
    } catch (e) {
      console.log(e.message);
      const newLibrary = this.db.create(argument);
      await this.db.save(newLibrary);
      return { result: true };
    }
  }
}

export default () => new LibraryModel();

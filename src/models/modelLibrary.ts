import Library from "./entities/Library.entity";
import { getRepository, Repository, DeepPartial } from "typeorm";
import { ModelBoolReturn } from "../types/model";

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

  async createOrOverwrite(
    data: DeepPartial<Library>
  ): Promise<ModelBoolReturn> {
    try {
      const existLibrary = await this.db.findOne({ location: data.location });
      if (!existLibrary) throw new Error("create new");

      await this.db.update(existLibrary, data);
      return { result: false };
    } catch (e) {
      console.log(e.message);
      const newLibrary = await this.db.create(data);
      await this.db.save(newLibrary);
      return { result: true };
    }
  }
}

export default () => new LibraryModel();

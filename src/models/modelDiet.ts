import Diet, { When } from "./entities/Diet.entity";
import { getRepository, Repository, DeepPartial } from "typeorm";
import { ModelBoolReturn, ModelInstanceReturn } from "../types/model";
import utils from "../utils";

class DietModel {
  private db: Repository<Diet>;
  private static instance: DietModel;
  constructor() {
    if (DietModel.instance) return DietModel.instance;
    this.db = getRepository(Diet);
    DietModel.instance = this;
    return this;
  }

  getErrorLog(fn: string) {
    return `${fn} has error in diet model`;
  }

  async createData(
    data: DeepPartial<Diet>
  ): Promise<ModelInstanceReturn<Diet>> {
    try {
      const newData = await this.db.create(data);
      const ret = { result: true, data: newData };
      return ret;
    } catch (e) {
      console.log(this.getErrorLog("createData"));
      return { result: false };
    }
  }

  async updateData(
    target: When,
    data: DeepPartial<Omit<Diet, "afterDay" | "id">>
  ): Promise<ModelBoolReturn> {
    try {
      await this.db.update({ afterDay: target }, data);
      return { result: true };
    } catch (e) {
      console.log(this.getErrorLog("updateData"));
      return { result: false };
    }
  }

  async createOrOverwrite(data: DeepPartial<Diet>): Promise<ModelBoolReturn> {
    try {
      const existDiets = await this.db.findOne({
        afterDay: data.afterDay,
        restaurant: data.restaurant
      });
      console.log(existDiets);
      if (!existDiets) throw new Error("create new");
      if (utils.isDietsChanged(existDiets, data))
        await this.db.update(existDiets, data);
      return { result: false };
    } catch (e) {
      console.log(e.message);
      const newDiets = await this.db.create(data);
      await this.db.save(newDiets);
      return { result: true };
    }
  }
}

export default () => new DietModel();

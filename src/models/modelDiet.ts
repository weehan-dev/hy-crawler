import Diet, {When} from './entities/Diet.entity';
import {getRepository, Repository, DeepPartial} from 'typeorm';
import {ModelBoolReturn, ModelInstanceReturn} from '../types/model';

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
      const ret = {result: true, data: newData};
      return ret;
    } catch (e) {
      console.log(this.getErrorLog('createData'));
      return {result: false};
    }
  }

  async updateData(
    target: When,
    data: DeepPartial<Omit<Diet, 'afterDay' | 'id'>>
  ): Promise<ModelBoolReturn> {
    try {
      await this.db.update({afterDay: target}, data);
      return {result: true};
    } catch (e) {
      console.log(this.getErrorLog('updateData'));
      return {result: false};
    }
  }
}

export default () => new DietModel();

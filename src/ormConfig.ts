import {ConnectionOptions} from 'typeorm';

import configs from './config';

const ormConfig: ConnectionOptions = {
  host: configs.DB.HOST,
  type: configs.DB.TYPE,
  port: configs.DB.PORT,
  url: configs.DB.URL,
  database: configs.DB.DATABASE,
  username: configs.DB.USERNAME,
  password: configs.DB.PASSWORD,
  synchronize: configs.ENV === 'dev',
  logging: ['error'],
  entities: [__dirname + '/models/entities/*']
};

export default ormConfig;

import { ConnectionOptions } from 'typeorm';

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
    logging: ['error', 'schema', 'log'],
    entities: [__dirname + '/models/entities/*'],
    migrations: [__dirname + '/models/migrations/*'],
    cli: { migrationsDir: 'models/migrations' },
};

export default ormConfig;

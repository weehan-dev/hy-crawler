import dotenv from 'dotenv';
import path from 'path';

type DatabaseType = 'postgres' | 'mysql';

export default () => {
  const ENV = process.env.ENV ? process.env.ENV : 'dev';
  const config = dotenv.config({
    path: path.join(__dirname, '..', '..', `${ENV}.env`)
  });
  if (!config) throw new Error('No env');
  console.log(config.parsed);

  return {
    ENV,
    DB: {
      HOST: process.env.DB_HOST as string,
      PORT: Number(process.env.DB_PORT),
      TYPE: process.env.DB_TYPE as DatabaseType,
      DATABASE: process.env.DB_NAME as string,
      USERNAME: process.env.DB_USERNAME as string,
      PASSWORD: process.env.DB_PASSWORD as string,
      URL: process.env.DB_URL
    }
  };
};

import { EnvKey } from 'src/shared/enums/env-key.enum';
import * as entities from './entities';
import { join as joinPath } from 'path';

/**
 * Load config without importing ConfigModule
 */
import 'src/shared/libs/dotenv.lib';

/**
 * This ConnectionOptions contain additional 'seeds' and 'factories' props
 */
import { ConnectionOptions } from 'typeorm-seeding';

const createRelativePath = (path: string) => joinPath(__dirname, path);

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env[EnvKey.DB_HOST],
  port: Number(process.env[EnvKey.DB_PORT]),
  database: process.env[EnvKey.DB_NAME],
  username: process.env[EnvKey.DB_USERNAME],
  password: process.env[EnvKey.DB_PASSWORD],
  entities: Object.values(entities),
  logger: 'advanced-console',
  logging: true,
  synchronize: false,
  seeds: [createRelativePath('seeds/*.seed.{ts,js}')],
  factories: [createRelativePath('factories/*.factory.{ts,js}')],
  migrations: [createRelativePath('migrations/*')],
  cli: {
    migrationsDir: createRelativePath('migrations'),
  },
};

export default connectionOptions;

import { ConfigService as ConfigServiceBase } from '@nestjs/config';
import { EnvKey } from 'src/shared/enums/env-key.enum';

export class ConfigService extends ConfigServiceBase {
  get jwtSecret() {
    return this.get(EnvKey.JWT_SECRET);
  }

  get jwtExpiresIn() {
    return this.get(EnvKey.JWT_EXPIRES_IN);
  }

  get serverPort() {
    return Number(this.get(EnvKey.SERVER_PORT));
  }

  get hashSaltRounds() {
    return Number(this.get(EnvKey.HASH_SALT_ROUNDS));
  }
}

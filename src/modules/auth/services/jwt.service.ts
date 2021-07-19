import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceBase } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class JwtService {
  private base: JwtServiceBase;

  constructor(private configService: ConfigService) {
    this.base = new JwtServiceBase({
      secret: configService.jwtSecret,
      signOptions: { expiresIn: configService.jwtExpiresIn },
    });
  }

  async verify(token: string) {
    return this.base.verifyAsync(token);
  }
}

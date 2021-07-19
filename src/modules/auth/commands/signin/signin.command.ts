import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { UsersRepository } from 'src/database/repositories';
import { compare } from 'src/shared/helpers/auth.helper';
import { IJwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import jwt from 'src/shared/libs/jwt.lib';
import { JwtTokenDto } from './jwt-token.dto';
import { SigninDto } from './signin.dto';

export class SigninCommand {
  constructor(public signinDto: SigninDto) {}
}

@CommandHandler(SigninCommand)
export class SigninCommandHandler implements ICommandHandler<SigninCommand> {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}
  async execute(command: SigninCommand): Promise<JwtTokenDto> {
    const { email, password } = command.signinDto;

    const user = await this.usersRepository.findOne({ email });

    if (!user) throw new BadRequestException('Cannot authenticate.');

    const passwordsMatch = await compare(password, user.password);

    if (!passwordsMatch) throw new BadRequestException('Cannot authenticate.');

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, this.configService.jwtSecret, {
      expiresIn: this.configService.jwtExpiresIn,
    });

    return { token };
  }
}

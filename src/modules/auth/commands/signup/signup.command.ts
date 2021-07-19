import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { UsersRepository } from 'src/database/repositories';
import { hash } from 'src/shared/helpers/auth.helper';
import { SignupDto } from './signup.dto';

export class SignupCommand {
  constructor(public signupDto: SignupDto) {}
}

@CommandHandler(SignupCommand)
export class SignupCommandHandler implements ICommandHandler<SignupCommand> {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}
  async execute(command: SignupCommand): Promise<void> {
    const { email, password, name } = command.signupDto;

    const emailTaken = await this.usersRepository.findOne({ email });
    if (emailTaken) throw new BadRequestException('Email already taken.');

    const user = new User();
    user.email = email;
    user.name = name;
    user.password = await hash(password);

    await this.usersRepository.save(user);
  }
}

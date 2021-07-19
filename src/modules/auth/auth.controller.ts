import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenDto } from './commands/signin/jwt-token.dto';
import { SigninCommand } from './commands/signin/signin.command';
import { SigninDto } from './commands/signin/signin.dto';
import { SignupCommand } from './commands/signup/signup.command';
import { SignupDto } from './commands/signup/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse()
  async signin(@Body() signinDto: SigninDto): Promise<JwtTokenDto> {
    return await this.commandBus.execute(new SigninCommand(signinDto));
  }

  @Post('signup')
  @ApiBadRequestResponse()
  async signup(@Body() signupDto: SignupDto): Promise<void> {
    await this.commandBus.execute(new SignupCommand(signupDto));
  }
}

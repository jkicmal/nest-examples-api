import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { CurrentUserPayload } from 'src/shared/interfaces/current-user-payload.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUserDto } from './queries/get-current-user/get-current-user.dto';
import { GetCurrentUserQuery } from './queries/get-current-user/get-current-user.query';

@ApiTags('users')
@Controller('/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private queryBus: QueryBus) {}

  @Get('/me')
  async getCurrentUser(
    @CurrentUser() currentUser: CurrentUserPayload,
  ): Promise<GetCurrentUserDto> {
    return await this.queryBus.execute(new GetCurrentUserQuery(currentUser.id));
  }
}

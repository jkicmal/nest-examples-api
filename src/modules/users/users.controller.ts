import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/database/entities';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
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
    @CurrentUser() currentUser: User,
  ): Promise<GetCurrentUserDto> {
    return await this.queryBus.execute(new GetCurrentUserQuery(currentUser.id));
  }
}

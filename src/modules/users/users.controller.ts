import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { User } from 'src/database/entities';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUserQuery } from './queries/get-current-user/get-current-user.query';

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private queryBus: QueryBus) {}

  @Get('/me')
  async getCurrentUser(@CurrentUser() currentUser: User) {
    return await this.queryBus.execute(new GetCurrentUserQuery(currentUser.id));
  }
}

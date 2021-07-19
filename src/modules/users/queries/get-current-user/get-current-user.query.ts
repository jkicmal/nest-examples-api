import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/database/repositories';
import { GetCurrentUserDto } from './get-current-user.dto';
import { classToClass } from 'class-transformer';

export class GetCurrentUserQuery {
  constructor(public currentUserId: string) {}
}

@QueryHandler(GetCurrentUserQuery)
export class GetCurrentUserQueryHandler
  implements IQueryHandler<GetCurrentUserQuery>
{
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async execute(query: GetCurrentUserQuery): Promise<GetCurrentUserDto> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.email')
      .addSelect('user.name')
      .getOne();

    return user as GetCurrentUserDto;
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/database/repositories';
import { GetCurrentUserDto } from './get-current-user.dto';

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

  async execute(): Promise<GetCurrentUserDto> {
    const user = await this.usersRepository.createQueryBuilder('user').getOne();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

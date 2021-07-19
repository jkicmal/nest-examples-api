import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
})
export class DatabaseModule {}

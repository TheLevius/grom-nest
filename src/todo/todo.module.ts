import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [],
  providers: [],
})
export class TodoModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Todo } from './todo/todo.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'grom_todo_nest',
      entities: [Todo],
      synchronize: true,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

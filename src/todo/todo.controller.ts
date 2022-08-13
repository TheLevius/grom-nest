import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todoDto';
import { Todo } from './todo.entity';
import { DeleteResult } from 'typeorm';

@Controller('api/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }
  @Get(':id')
  getOneTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getOneTodo(id);
  }
  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(createTodoDto);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id);
  }
  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }
}

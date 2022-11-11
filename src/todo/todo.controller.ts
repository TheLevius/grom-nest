import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todoDto';
import { Todo, TodoStatuses } from './todo.entity';
import { DeleteResult } from 'typeorm';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundResponse } from './dto/types';

@ApiTags('todos')
@Controller('api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Get All Todos', type: [Todo] })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoService.getAllTodos();
    return todos;
  }
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get Todo by Id', type: Todo })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  async getOneTodo(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.getOneTodo(Number(id));
    if (todo === undefined) {
      throw new BadRequestException('Invalid id');
    }
    return todo;
  }
  @Post()
  @ApiResponse({ status: 200, description: 'Todo created', type: Todo })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @ApiBody({ type: CreateTodoDto })
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = await this.todoService.createTodo(createTodoDto);
    return createdTodo;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete todo' })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  async deleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    const deletedTodo = await this.todoService.deleteTodo(Number(id));
    return deletedTodo;
  }
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Todo updated', type: Todo })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    type: NotFoundResponse,
  })
  @ApiBody({ type: UpdateTodoDto })
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const todoDto: UpdateTodoDto = {};

    if (updateTodoDto?.title?.length > 0) {
      todoDto.title = updateTodoDto.title;
    }

    if (
      updateTodoDto?.status &&
      TodoStatuses?.[updateTodoDto.status] === undefined
    ) {
      throw new HttpException(`status incorrect`, HttpStatus.BAD_REQUEST);
    } else {
      todoDto.status = updateTodoDto.status;
    }

    if (Object.keys(todoDto).length === 0) {
      throw new HttpException(`nothing to update`, HttpStatus.BAD_REQUEST);
    }
    return this.todoService.updateTodo(Number(id), todoDto);
  }
}

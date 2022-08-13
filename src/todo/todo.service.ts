import { Injectable } from '@nestjs/common';
import { Todo, TodoStatuses } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './dto/todoDto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private TodosRepository: Repository<Todo>,
  ) {}
  async getAllTodos(): Promise<Array<Todo>> {
    return await this.TodosRepository.find();
  }
  async getOneTodo(id: string): Promise<Todo> {
    return await this.TodosRepository.findOneBy({ id: Number(id) });
  }
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todoDto = new CreateTodoDto(createTodoDto.title);
    return await this.TodosRepository.save(todoDto);
  }
  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    const todoDto = new UpdateTodoDto();
    if (updateTodoDto?.title?.length > 0) {
      todoDto.title = updateTodoDto.title;
    }
    if (
      updateTodoDto.status === TodoStatuses.pending ||
      updateTodoDto.status === TodoStatuses.finished
    ) {
      todoDto.status = updateTodoDto.status;
    }
    return await this.TodosRepository.update(Number(id), { ...todoDto });
  }
  async deleteTodo(id: string): Promise<DeleteResult> {
    return await this.TodosRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './dto/todoDto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private TodosRepository: Repository<Todo>,
  ) {}
  async getAllTodos(): Promise<Array<Todo>> {
    return this.TodosRepository.find();
  }
  async getOneTodo(id: number): Promise<Todo> {
    return this.TodosRepository.findOneBy({ id: Number(id) });
  }
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todoDto = new CreateTodoDto(createTodoDto.title);
    return this.TodosRepository.save(todoDto);
  }
  async updateTodo(id: number, updatedTodoDto: UpdateTodoDto) {
    return this.TodosRepository.update(id, updatedTodoDto);
  }
  async deleteTodo(id: number): Promise<DeleteResult> {
    return this.TodosRepository.delete(id);
  }
}

import { TodoStatuses } from '../todo.entity';

export class CreateTodoDto {
  readonly title: string;
  readonly status: TodoStatuses;

  constructor(title = '', status = TodoStatuses.pending) {
    this.title = title;
    this.status = status;
  }
}

export class UpdateTodoDto {
  title?: string;
  status?: TodoStatuses;
}

import { ApiProperty } from '@nestjs/swagger';
import { TodoStatuses } from '../todo.entity';

export class CreateTodoDto {
  @ApiProperty({
    required: false,
  })
  readonly title: string;
  
  @ApiProperty({
    required: false,
  })
  readonly status: TodoStatuses;

  constructor(title = 'Empty title', status = TodoStatuses.pending) {
    this.title = title;
    this.status = status;
  }
}
export class UpdateTodoDto {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  status?: TodoStatuses;
}

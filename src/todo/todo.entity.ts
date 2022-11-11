import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatuses {
  pending = 'pending',
  finished = 'finished',
}
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  title: string;
  @ApiProperty()
  @Column({ default: TodoStatuses.pending, nullable: false })
  status: string;
}

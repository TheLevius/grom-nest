import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatuses {
  pending = 'pending',
  finished = 'finished',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: TodoStatuses.pending, nullable: false })
  status: string;
}

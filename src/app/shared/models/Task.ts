import { TaskStatus } from '@src/app/core/constants/task-status';

export class Task {
  constructor(
    public id: string,
    public userEmail: string,
    public title: string,
    public date: string,
    public status: TaskStatus,
    public description: string
  ) {}
}


import { immerable } from 'immer';
import { TaskStatus } from '../../utils/constants/task-status';

export class Task {
  static [immerable] = true;

  constructor(
    public id: string,
    public userEmail: string,
    public title: string,
    public date: string,
    public status: TaskStatus,
    public description: string
  ) {}
}

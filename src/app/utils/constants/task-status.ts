export enum TaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export const TASK_STATUS_OPTIONS = [
  {
    label: 'Not Started',
    value: TaskStatus.NOT_STARTED
  },
  {
    label: 'In Progress',
    value: TaskStatus.IN_PROGRESS
  },
  {
    label: 'Completed',
    value: TaskStatus.COMPLETED
  },
  {
    label: 'All',
    value: 'ALL'
  }
];

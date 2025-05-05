import { SortOrder } from '@src/app/core/constants/sort-order';
import { TaskStatus } from '@src/app/core/constants/task-status';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortOrder?: SortOrder;
}

export interface TaskPaginationOptions extends PaginationOptions {
  sortBy?: 'date';
  filter?: {
    keyword?: string;
    status?: TaskStatus;
  };
}

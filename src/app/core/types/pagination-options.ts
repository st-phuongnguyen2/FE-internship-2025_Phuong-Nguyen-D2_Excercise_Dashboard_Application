import { SortOrder } from '@src/app/core/constants/sort-order';
import { TaskStatus } from '@src/app/core/constants/task-status';
import { TaskSortField } from '@src/app/core/constants/task-sort-field';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortOrder?: SortOrder;
}

export interface TaskPaginationOptions extends PaginationOptions {
  sortBy?: TaskSortField.DATE;
  filter?: {
    keyword?: string;
    status?: TaskStatus;
  };
}

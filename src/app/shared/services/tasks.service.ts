import { StorageKeys } from '@src/app/core/constants/local-storage-keys';
import { SortOrder } from '@src/app/core/constants/sort-order';
import { TaskSortField } from '@src/app/core/constants/task-sort-field';
import { TaskPaginationOptions } from '@src/app/core/types/pagination-options';
import { LocalStorage } from '@src/app/core/utils/local-storage';
import { paginate } from '@src/app/core/utils/paginate';
import { Task } from '@src/app/shared/models/Task';

class TaskService {
  async getTasks({
    page = 1,
    limit,
    userEmail,
    sortBy = TaskSortField.DATE,
    sortOrder = SortOrder.LATEST,
    filter
  }: TaskPaginationOptions & { userEmail: string }) {
    let list = LocalStorage.get<Task[]>(StorageKeys.TASKS);

    if (Array.isArray(list) && list.length > 0) {
      list = list.filter((item) => item.userEmail === userEmail);

      if (filter) {
        if (filter.keyword) {
          const keyword = filter.keyword;

          list = list.filter((item) =>
            item.title.toLowerCase().includes(keyword.toLowerCase())
          );
        }

        if (filter.status) {
          const status = filter.status;

          list = list.filter((item) => item.status === status);
        }
      }

      if (sortBy === TaskSortField.DATE) {
        if (sortOrder === SortOrder.OLDEST) {
          list = list.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        } else {
          list = list.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        }
      }

      const actualLimit = limit != null ? limit : list.length;

      const paginatedList = paginate({ list, page, limit: actualLimit });

      return {
        list: paginatedList,
        totalPages: Math.ceil(list.length / actualLimit),
        limit: actualLimit,
        page
      };
    } else
      return {
        list: [],
        totalPages: 0,
        limit,
        page
      };
  }

  async getTaskById({
    taskId,
    userEmail
  }: {
    taskId: string;
    userEmail: string;
  }) {
    const list = LocalStorage.get<Task[]>(StorageKeys.TASKS);

    if (Array.isArray(list) && list.length > 0) {
      const foundItem = list.find(
        (item) => item.id === taskId && item.userEmail === userEmail
      );

      if (foundItem) return foundItem;
      else throw new Error(`Task item ${taskId} doesn't exist!`);
    } else throw new Error(`Task item ${taskId} doesn't exist!`);
  }

  async createTask(task: Task) {
    let list = LocalStorage.get<Task[]>(StorageKeys.TASKS);

    if (Array.isArray(list) && list.length > 0) {
      list.push(task);
    } else {
      list = [task];
    }

    LocalStorage.set(StorageKeys.TASKS, list);
  }

  async deleteTask({
    taskId,
    userEmail
  }: {
    taskId: string;
    userEmail: string;
  }) {
    let list = LocalStorage.get<Task[]>(StorageKeys.TASKS);

    if (Array.isArray(list) && list.length > 0) {
      list = list.filter(
        (item) => item.id !== taskId && item.userEmail === userEmail
      );
      LocalStorage.set(StorageKeys.TASKS, list);
    }
  }

  async updateTask({ task, userEmail }: { task: Task; userEmail: string }) {
    const list = LocalStorage.get<Task[]>(StorageKeys.TASKS);
    if (Array.isArray(list) && list.length > 0) {
      const foundIndex = list.findIndex(
        (item) => item.userEmail === userEmail && item.id === task.id
      );

      if (foundIndex !== -1) {
        list[foundIndex] = task;
        LocalStorage.set(StorageKeys.TASKS, list);
      } else {
        throw new Error(`Task item ${task.id} doesn't exist!`);
      }
    }
  }
}

export const taskService = new TaskService();

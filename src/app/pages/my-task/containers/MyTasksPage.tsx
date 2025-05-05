import { Pagination } from '@mui/material';
import { ITEMS_PER_PAGE } from '@src/app/core/constants/pagination';
import {
  SORT_ORDER_OPTIONS,
  SortOrder
} from '@src/app/core/constants/sort-order';
import { TaskFormTitle } from '@src/app/core/constants/task-form-title';
import { TaskSortField } from '@src/app/core/constants/task-sort-field';
import {
  TASK_STATUS_OPTIONS,
  TaskStatus
} from '@src/app/core/constants/task-status';
import { TaskPaginationOptions } from '@src/app/core/types/pagination-options';
import FormInput from '@src/app/shared/components/form/FormInput';
import TaskDetail from '@src/app/shared/components/TaskDetail';
import TaskList from '@src/app/shared/components/TaskList';
import { AuthContext } from '@src/app/shared/contexts/auth.context';
import { useAppDispatch } from '@src/app/shared/hooks/redux-hook';
import { Task } from '@src/app/shared/models/Task';
import { taskService } from '@src/app/shared/services/tasks.service';
import { setTaskForm } from '@src/app/store/task-modal/task-modal-slice';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import notebookIcon from '/icons/notebook-icon.svg';
import plusIcon from '/icons/plus-icon.svg';

const MyTasksPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  const [taskInfo, setTaskInfo] = useState({
    list: [] as Task[],
    params: {
      page: 1,
      limit: ITEMS_PER_PAGE,
      totalPages: 0,
      sortBy: TaskSortField.DATE,
      sortOrder: SortOrder.LATEST
    }
  });

  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(
    undefined
  );

  const { register, watch } = useForm({
    values: { search: '', sort: SortOrder.LATEST, status: 'ALL' }
  });

  const search = watch('search');
  const sort = watch('sort');
  const status = watch('status');

  const actualStatus = status === 'ALL' ? undefined : (status as TaskStatus);

  const selectedTask = taskInfo.list.find((item) => item.id === selectedTaskId);

  function handleOpenAddTaskModal() {
    dispatch(
      setTaskForm({
        formTitle: TaskFormTitle.ADD,
        isOpen: true,
        taskForm: {
          title: '',
          description: '',
          date: new Date(),
          status: TaskStatus.NOT_STARTED
        },
        onSuccess: () =>
          fetchTasks({
            userEmail: user!.email,
            limit: taskInfo.params.limit,
            page: taskInfo.params.page,
            sortOrder: sort,
            filter: {
              keyword: search,
              status: actualStatus
            }
          })
      })
    );
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setTaskInfo((state) => ({
      ...state,
      params: {
        ...state.params,
        page
      }
    }));
  };

  function handleSelectTask(task: Task) {
    setSelectedTaskId(task.id);
  }

  function onEditTask(task: Task) {
    dispatch(
      setTaskForm({
        isOpen: true,
        formTitle: TaskFormTitle.UPDATE,
        taskForm: {
          title: task.title,
          status: task.status,
          description: task.description,
          date: new Date(task.date)
        },
        taskId: selectedTaskId,
        onSuccess: () =>
          fetchTasks({
            userEmail: user!.email,
            limit: taskInfo.params.limit,
            page: taskInfo.params.page,
            sortOrder: sort,
            filter: {
              keyword: search,
              status: actualStatus
            }
          })
      })
    );
  }

  async function onDeleteTask(task: Task) {
    const confirm = window.confirm(
      'Are you sure that you want to delete this task?'
    );
    if (confirm) {
      await taskService.deleteTask({ taskId: task.id, userEmail: user!.email });
      fetchTasks({
        userEmail: user!.email,
        limit: taskInfo.params.limit,
        page: 1,
        sortOrder: sort,
        filter: {
          keyword: search,
          status: actualStatus
        }
      });
    }
  }

  async function fetchTasks(
    params: TaskPaginationOptions & {
      userEmail: string;
    }
  ) {
    const data = await taskService.getTasks(params);

    setTaskInfo((state) => ({
      ...state,
      list: data.list,
      params: {
        ...state.params,
        totalPages: data.totalPages
      }
    }));

    setSelectedTaskId(data.list[0]?.id);
  }

  useEffect(() => {
    if (user) {
      fetchTasks({
        userEmail: user.email,
        limit: taskInfo.params.limit,
        page: taskInfo.params.page,
        sortOrder: sort,
        filter: {
          keyword: search,
          status: actualStatus
        }
      });
    }
  }, [
    search,
    actualStatus,
    sort,
    user,
    taskInfo.params.page,
    taskInfo.params.limit
  ]);

  return (
    <>
      <form action="" className="form filter-form">
        <FormInput label="Search" formRegister={register('search')} />
        <FormInput
          label="Status"
          customInput={
            <>
              <select
                id="Status"
                className="form-input select-input"
                {...register('status')}
              >
                {TASK_STATUS_OPTIONS.map((item) => (
                  <option value={item.value} id={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </>
          }
        />
        <FormInput
          label="Sort"
          customInput={
            <>
              <select
                id="Sort"
                className="form-input select-input"
                {...register('sort')}
              >
                {SORT_ORDER_OPTIONS.map((item) => (
                  <option value={item.value} id={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </>
          }
        />
      </form>
      <div className="content-body">
        <div className="section-todo">
          <div className="todo-header">
            <h2 className="title">
              <img src={notebookIcon} alt="notebook-icon" className="icon" />
              My Tasks
            </h2>
            <span className="todo-action" onClick={handleOpenAddTaskModal}>
              <img src={plusIcon} alt="plus-icon" className="icon" />
              Add task
            </span>
          </div>
          <TaskList
            taskList={taskInfo.list}
            onTaskClick={handleSelectTask}
            selectedTaskId={selectedTaskId}
          />
          <Pagination
            className="pagination"
            count={taskInfo.params.totalPages}
            page={taskInfo.params.page}
            color="primary"
            onChange={handlePageChange}
          />
        </div>
        <TaskDetail
          detailHeader="Submit Documents"
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          task={selectedTask}
        />
      </div>
    </>
  );
};

export default MyTasksPage;

import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import notebookIcon from '../../../../assets/icons/notebook-icon.svg';
import plusIcon from '../../../../assets/icons/plus-icon.svg';
import { setTaskForm } from '../../../redux-store/task-modal/task-modal-slice';
import FormInput from '../../../shared/components/form/FormInput';
import TaskList from '../../../shared/components/TaskList';
import {
  useAppDispatch,
  useAppSelector
} from '../../../shared/hooks/redux-hook';
import { ITEMS_PER_PAGE } from '../../../utils/constants/pagination';
import { TaskFormTitle } from '../../../utils/constants/task-form-title';
import {
  TASK_STATUS_OPTIONS,
  TaskStatus
} from '../../../utils/constants/task-status';
import { useForm } from 'react-hook-form';
import {
  SORT_ORDER_OPTIONS,
  SortOrder
} from '../../../utils/constants/sort-order';
import { Task } from '../../../shared/models/Task';
import TaskDetail from '../../../shared/components/TaskDetail';
import {
  deleteTask,
  setSelectedTaskId
} from '../../../redux-store/tasks/tasks-slice';

const MyTask = () => {
  const dispatch = useAppDispatch();
  const { tasks, selectedTaskId } = useAppSelector((state) => state.tasks);
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const tasksOfCurrentUser = tasks.filter(
    (task) => task.userEmail === currentUser?.email
  );
  const { register, watch } = useForm({
    values: { search: '', sort: SortOrder.LATEST, status: 'ALL' }
  });

  const search = watch('search');
  const sort = watch('sort');
  const status = watch('status');

  const [page, setPage] = useState(1);

  const filteredTask = sortAndFilterTasks();

  const totalPages = Math.ceil(filteredTask.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedTasks = filteredTask.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const selectedTask = paginatedTasks.find(
    (item) => item.id === selectedTaskId
  );

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
        }
      })
    );
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  function sortAndFilterTasks() {
    let filteredTasks = tasksOfCurrentUser;
    if (sort === SortOrder.LATEST) {
      filteredTasks = filteredTasks.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      filteredTasks = filteredTasks.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    const keyword = search.trim().toLowerCase();
    if (keyword) {
      filteredTasks = filteredTasks.filter((item) =>
        item.title.toLowerCase().includes(keyword)
      );
    }

    if (status !== 'ALL') {
      filteredTasks = filteredTasks.filter((item) => item.status === status);
    }

    return filteredTasks;
  }

  function handleSelectTask(task: Task) {
    dispatch(setSelectedTaskId(task?.id));
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
        }
      })
    );
  }

  function onDeleteTask(task: Task) {
    const confirm = window.confirm(
      'Are you sure that you want to delete this task?'
    );
    if (confirm) {
      dispatch(deleteTask(task.id));
    }
  }

  useEffect(() => {
    dispatch(setSelectedTaskId(paginatedTasks[0]?.id));
  }, [search, sort, status, page, tasks]);

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
            taskList={paginatedTasks}
            onTaskClick={handleSelectTask}
            selectedTaskId={selectedTaskId}
          />
          <Pagination
            className="pagination"
            count={totalPages}
            page={page}
            color="primary"
            onChange={handlePageChange}
          />
        </div>
        <TaskDetail
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          task={selectedTask}
        />
      </div>
    </>
  );
};

export default MyTask;

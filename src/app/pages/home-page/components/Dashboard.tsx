import dayjs from 'dayjs';
import grayDotIcon from '../../../../assets/icons/gray-dot-icon.svg';
import handWaveIcon from '../../../../assets/icons/hand-wave-icon.svg';
import notebookIcon from '../../../../assets/icons/notebook-icon.svg';
import notebookTickIcon from '../../../../assets/icons/notebook-tick-icon.svg';

import plusIcon from '../../../../assets/icons/plus-icon.svg';
import { setTaskForm } from '../../../redux-store/task-modal/task-modal-slice';
import CreateUpdateTaskModal from '../../../shared/components/CreateUpdateTaskModal';
import TaskList from '../../../shared/components/TaskList';
import {
  useAppDispatch,
  useAppSelector
} from '../../../shared/hooks/redux-hook';
import { Task } from '../../../shared/models/Task';
import { TaskFormTitle } from '../../../utils/constants/task-form-title';
import { TaskStatus } from '../../../utils/constants/task-status';
import { renderStatusDot } from '../../../utils/render-task';
import CircularProgressWithLabel from './CircularProgressWithLabel';

const Dashboard = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const tasksOfCurrentUser = tasks.filter(
    (task) => task.userEmail === currentUser?.email
  );
  const dispatch = useAppDispatch();

  function groupByDate(items: Task[]) {
    return items.reduce((groups, item) => {
      const dt = new Date(item.date);
      // “en-CA” gives “YYYY-MM-DD”
      const dayKey = dt.toLocaleDateString('en-CA');
      (groups[dayKey] ??= []).push(item);
      return groups;
    }, {} as any);
  }

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

  function isToday(date: Date) {
    return date.toDateString() === new Date().toDateString();
  }

  function renderLatestTasks() {
    const latestTasks = tasksOfCurrentUser
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    console.log('groupByDate(latestTasks):', groupByDate(latestTasks));
    const groups = Object.values(groupByDate(latestTasks));
    console.log('groups:', groups);

    return groups.map((group: any) => {
      return (
        <ul className="list">
          <li className="list-item">
            <h2 className="item-title">
              <span className="item-subtitle">
                {dayjs(group[0].date).format('D MMMM')}
              </span>

              {isToday(new Date(group[0].date)) ? (
                <>
                  <img
                    src={grayDotIcon}
                    alt="icon"
                    className="icon gray-dot-icon"
                  />
                  Today
                </>
              ) : (
                ''
              )}
            </h2>
          </li>
          <TaskList taskList={group} />
        </ul>
      );
    });
  }

  function renderTaskStatistic() {
    let inprogressTaskSum = 0;
    let notStartedTaskSum = 0;
    let completedTaskSum = 0;

    tasksOfCurrentUser.forEach((task) => {
      if (task.status === TaskStatus.NOT_STARTED) {
        notStartedTaskSum += 1;
      } else if (task.status === TaskStatus.IN_PROGRESS) {
        inprogressTaskSum += 1;
      } else completedTaskSum += 1;
    });

    console.log('tasksOfCurrentUser', tasksOfCurrentUser);

    return (
      <>
        <div className="task-status-header">
          <h2 className="title">
            <img
              src={notebookTickIcon}
              alt="notebook-tick-icon"
              className="icon notebook-tick-icon"
            />
            Task Status
          </h2>
        </div>
        <div className="progress-chart">
          <div className="progress-group">
            <CircularProgressWithLabel
              value={Math.ceil(
                (completedTaskSum / tasksOfCurrentUser.length) * 100
              )}
              size={140}
              className="completed-status"
            />
            <div className="label-group">
              <img
                src={renderStatusDot(TaskStatus.COMPLETED)}
                alt="icon"
                className="icon"
              />
              Completed
            </div>
          </div>
          <div className="progress-group">
            <CircularProgressWithLabel
              value={Math.ceil(
                (inprogressTaskSum / tasksOfCurrentUser.length) * 100
              )}
              size={140}
              className="inprogress-status"
            />
            <div className="label-group">
              <img
                src={renderStatusDot(TaskStatus.IN_PROGRESS)}
                alt="icon"
                className="icon"
              />
              In Progress
            </div>
          </div>
          <div className="progress-group">
            <CircularProgressWithLabel
              value={Math.ceil(
                (notStartedTaskSum / tasksOfCurrentUser.length) * 100
              )}
              size={140}
              className="not-started-status"
            />
            <div className="label-group">
              <img
                src={renderStatusDot(TaskStatus.NOT_STARTED)}
                alt="icon"
                className="icon"
              />
              Not Started
            </div>
          </div>
        </div>
      </>
    );
  }

  function renderCompletedTasks() {
    return (
      <>
        <div className="task-status-header">
          <h2 className="title">
            <img
              src={notebookTickIcon}
              alt="notebook-tick-icon"
              className="icon notebook-tick-icon"
            />
            Completed Task
          </h2>
        </div>

        <TaskList
          taskList={tasksOfCurrentUser.filter(
            (item) => item.status === TaskStatus.COMPLETED
          )}
        />
      </>
    );
  }

  return (
    <>
      <CreateUpdateTaskModal />
      <h2 className="content-header">
        Welcome back, {currentUser?.fullName}
        <img src={handWaveIcon} alt="hand-wave-icon" className="icon" />
      </h2>
      <div className="content-body">
        <div className="section-todo">
          <div className="todo-header">
            <h2 className="title">
              <img src={notebookIcon} alt="notebook-icon" className="icon" />
              To-Do
            </h2>
            <span className="todo-action" onClick={handleOpenAddTaskModal}>
              <img src={plusIcon} alt="plus-icon" className="icon" />
              Add task
            </span>
          </div>
          <div className="todo-group">{renderLatestTasks()}</div>
        </div>
        <div className="section-statistic">
          <div className="task-status-statistic">{renderTaskStatistic()}</div>
          <div className="completed-tasks">{renderCompletedTasks()}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

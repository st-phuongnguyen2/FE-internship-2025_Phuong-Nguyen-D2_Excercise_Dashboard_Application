import dayjs from 'dayjs';

import { renderStatusBorderIcon, renderStatusName } from '@src/app/core/utils/render-task';
import { Task } from '@src/app/shared/models/Task';

import EllipsisTooltip from './EllipsisTooltip';

interface ITaskListProps {
  taskList: Task[];
  onTaskClick?: (task: Task) => void;
  selectedTaskId?: string;
}

const TaskList = ({
  taskList,
  onTaskClick,
  selectedTaskId
}: ITaskListProps) => {
  return (
    <ul className="list">
      {taskList.map((task: Task) => {
        return (
          <li
            className="list-item"
            onClick={() => onTaskClick?.(task)}
            id={task.id}
          >
            <div
              className={`card ${
                selectedTaskId === task.id ? 'selected-task' : ''
              }`}
            >
              <img
                src={renderStatusBorderIcon(task.status)}
                alt="icon"
                className="card-icon"
              />
              <div className="card-body">
                <div className="card-title">{task.title}</div>
                <div className="card-description">
                  <EllipsisTooltip title={task.description} />
                </div>
                <div className="card-status">
                  <span className="card-key">
                    Status:&nbsp;
                    {renderStatusName(task.status)}
                  </span>
                  <span className="card-key">
                    Created on: {dayjs(task.date).format('MM/DD/YYYY')}
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;

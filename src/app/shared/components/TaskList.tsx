import dayjs from 'dayjs';
import {
  renderStatusBorderIcon,
  renderStatusName
} from '../../utils/render-task';
import { Task } from '../models/Task';
import EllipsisTooltip from './EllipsisTooltip';

interface ITaskListProps {
  taskList: Task[];
}

const TaskList = ({ taskList }: ITaskListProps) => {
  return (
    <ul className="list">
      {taskList.map((task: Task) => {
        return (
          <li className="list-item">
            <div className="card">
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

import dayjs from 'dayjs';
import { renderStatusName } from '../../utils/render-task';
import { Task } from '../models/Task';
import editIcon from '../../../assets/icons/edit-icon.svg';
import deleteIcon from '../../../assets/icons/delete-icon.svg';

interface ITaskDetail {
  task?: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

const TaskDetail = ({ task, onEdit, onDelete }: ITaskDetail) => {
  return (
    <div className="todo-detail">
      {task ? (
        <>
          <div className="todo-header">
            <h2 className="title">Submit Documents</h2>
          </div>
          <div className="todo-status">
            <span className="card-key">
              Status:&nbsp;
              {renderStatusName(task.status)}
            </span>
            <span className="card-key">
              Created on: {dayjs(task.date).format('MM/DD/YYYY')}
            </span>
          </div>
          <div className="todo-info">
            <span className="card-key">
              Task Title:&nbsp;
              <span className="card-value">{task.title}</span>
            </span>
            <span className="card-key">
              Task Description:&nbsp;
              <span className="card-value"> {task.description}</span>
            </span>
          </div>
          <div className="todo-action">
            <img
              src={deleteIcon}
              alt="delete-icon"
              className="icon"
              onClick={() => onDelete?.(task)}
            />
            <img
              src={editIcon}
              alt="edit-icon"
              className="icon"
              onClick={() => onEdit?.(task)}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TaskDetail;

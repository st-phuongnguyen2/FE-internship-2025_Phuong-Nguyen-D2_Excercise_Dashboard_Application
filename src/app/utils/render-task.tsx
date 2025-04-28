import blueBorderIcon from '../../assets/icons/blue-border-icon.svg';
import blueDotIcon from '../../assets/icons/blue-dot-icon.svg';
import greenBorderIcon from '../../assets/icons/green-border-icon.svg';
import greenDotIcon from '../../assets/icons/green-dot-icon.svg';
import redBorderIcon from '../../assets/icons/red-border-icon.svg';
import redDotIcon from '../../assets/icons/red-dot-icon.svg';
import { TaskStatus } from './constants/task-status';

export function renderStatusBorderIcon(status: TaskStatus) {
  {
    if (status === TaskStatus.NOT_STARTED) {
      return redBorderIcon;
    } else if (status === TaskStatus.IN_PROGRESS) {
      return blueBorderIcon;
    } else return greenBorderIcon;
  }
}

export function renderStatusDot(status: TaskStatus) {
  if (status === TaskStatus.NOT_STARTED) {
    return redDotIcon;
  } else if (status === TaskStatus.IN_PROGRESS) {
    return blueDotIcon;
  } else return greenDotIcon;
}

export function renderStatusName(status: TaskStatus) {
  if (status === TaskStatus.NOT_STARTED)
    return <span className="card-value not-started-status">Not Started</span>;
  else if (status === TaskStatus.IN_PROGRESS)
    return <span className="card-value inprogress-status">In Progress</span>;
  else return <span className="card-value completed-status">Completed</span>;
}

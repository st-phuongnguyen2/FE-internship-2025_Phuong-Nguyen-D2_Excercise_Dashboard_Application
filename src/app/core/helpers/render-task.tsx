import { TaskStatus } from '@src/app/core/constants/task-status';

import blueBorderIcon from '/icons/blue-border-icon.svg';
import blueDotIcon from '/icons/blue-dot-icon.svg';
import greenBorderIcon from '/icons/green-border-icon.svg';
import greenDotIcon from '/icons/green-dot-icon.svg';
import redBorderIcon from '/icons/red-border-icon.svg';
import redDotIcon from '/icons/red-dot-icon.svg';

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

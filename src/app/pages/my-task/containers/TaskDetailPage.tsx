import { AppRoutes } from '@src/app/core/constants/app-routes';
import { TaskFormTitle } from '@src/app/core/constants/task-form-title';
import TaskDetail from '@src/app/shared/components/TaskDetail';
import { AuthContext } from '@src/app/shared/contexts/auth.context';
import { useAppDispatch } from '@src/app/shared/hooks/redux-hook';
import { Task } from '@src/app/shared/models/Task';
import { taskService } from '@src/app/shared/services/tasks.service';
import { setTaskForm } from '@src/app/store/task-modal/task-modal-slice';

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const TaskDetailPage = () => {
  const params = useParams<{ id: string }>();
  const [taskDetail, setTaskDetail] = useState<Task | undefined>();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        taskId: taskDetail?.id,
        onSuccess: () =>
          fetchTaskById({ userEmail: user!.email, taskId: params.id || '' })
      })
    );
  }

  async function onDeleteTask(task: Task) {
    const confirm = window.confirm(
      'Are you sure that you want to delete this task?'
    );
    if (confirm) {
      await taskService.deleteTask({ taskId: task.id, userEmail: user!.email });
      navigate(AppRoutes.HOME, { replace: true });
    }
  }

  async function fetchTaskById(params: { taskId: string; userEmail: string }) {
    try {
      const task = await taskService.getTaskById(params);

      if (task) {
        setTaskDetail(task);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }

      navigate(AppRoutes.HOME, {
        replace: true
      });
    }
  }

  useEffect(() => {
    if (user) {
      fetchTaskById({ userEmail: user?.email, taskId: params.id || '' });
    }
  }, [params.id, user]);

  return (
    <div className="section-todo-detail">
      {taskDetail && (
        <TaskDetail
          task={taskDetail}
          detailHeader={taskDetail.title}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskDetailPage;

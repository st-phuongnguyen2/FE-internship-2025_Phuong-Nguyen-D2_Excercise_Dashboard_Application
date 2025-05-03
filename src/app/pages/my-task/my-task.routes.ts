import { AppRoutes } from '@src/app/core/constants/app-routes';
import { PageRoute } from '@src/app/core/modules/custom-router-dom/router.interface';
import TaskPage from './MyTaskPage';
import MyTasks from './containers/MyTasks';
import TaskDetailPage from './containers/TaskDetailPage';

export const taskRoutes: PageRoute[] = [
  {
    isProtected: true,
    path: AppRoutes.MY_TASKS,
    component: TaskPage,
    children: [
      {
        path: '',
        component: MyTasks
      },
      {
        path: `${AppRoutes.MY_TASKS}/:id`,
        component: TaskDetailPage
      }
    ]
  }
];

import { AppRoutes } from '@src/app/core/constants/app-routes';
import { PageRoute } from '@src/app/core/modules/custom-router-dom/router.interface';

import { lazy } from 'react';

import MyTasks from './containers/MyTasksPage';
import TaskDetailPage from './containers/TaskDetailPage';

const MyTaskPage = lazy(() => import('./MyTaskPage'));

export const taskRoutes: PageRoute[] = [
  {
    isProtected: true,
    path: AppRoutes.MY_TASKS,
    component: MyTaskPage,
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

import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import authRoutes from './core/auth/auth.routes';
import { renderChildren } from './core/modules/custom-router-dom/RouterOutlet';
import { homepageRoutes } from './pages/homepage/homepage.routes';
import { taskRoutes } from './pages/my-task/my-task.routes';

const route = [...authRoutes, ...homepageRoutes, ...taskRoutes];
console.log('route:', route);

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: renderChildren(route)
  }
]);

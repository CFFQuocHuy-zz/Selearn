import { Pages } from '../pages';
import { createRoutes } from './routes-config';

export const routes = createRoutes({
  fallback_route: '/login',
  layouts: {},
  routes: [
    { path: '*', element: <div></div> },
    {
      path: '/',
      element: <Pages.Home />,
    },
    { path: '/404', element: <div></div> },
  ],
});

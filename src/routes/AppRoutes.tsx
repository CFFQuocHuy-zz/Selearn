import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

export const AppRoutes = () => {
  const allRoutes = useRoutes(routes);

  return allRoutes;
};

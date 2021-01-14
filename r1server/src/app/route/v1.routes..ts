import { ServerRoute } from '@hapi/hapi';
import { Container } from 'inversify';
import { IDENTIFIER } from '../../helpers/utilites/identifier';
import { IUsersRoutes } from '../api/v1/Users/Users.Routes';

export const createAppRoutesV1 = (container: Container): ServerRoute[] => {
  let routes: ServerRoute[] = [];

  const usersRoutes = container.get<IUsersRoutes>(IDENTIFIER.USERS_ROUTES);

  routes = [
    ...routes,
    ...usersRoutes.getUsersRoutes(),
  ];

  return routes;
};

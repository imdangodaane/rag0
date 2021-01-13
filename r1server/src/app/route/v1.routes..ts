import hapi from '@hapi/hapi';
import { Container } from 'inversify';
import { IUsersController } from '../api/v1/Users/Users.Controller';

export const createAppRoutesV1 = (container: Container): hapi.ServerRoute[] => {
  const usersController = container.get<IUsersController>('IUsersController');

  let routes: hapi.ServerRoute[] = [];

  routes = [
    ...routes,
    ...usersController.getRoutes(),
  ];

  return routes;
};

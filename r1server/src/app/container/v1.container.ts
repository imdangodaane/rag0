import { Container } from 'inversify';
import { IDENTIFIER } from '../../helpers/utilites/identifier';
import { IUsersBusinessLogic, UsersBusinessLogic } from '../api/v1/Users/Users.BusinessLogic';
import { IUsersController, UsersController } from '../api/v1/Users/Users.Controller';
import { IUsersRoutes, UsersRoutes } from '../api/v1/Users/Users.Routes';

export const createAppContainerV1 = (): Container => {
  const container = new Container();

  container.bind<IUsersRoutes>(IDENTIFIER.USERS_ROUTES).to(UsersRoutes);
  container.bind<IUsersController>(IDENTIFIER.USERS_CONTROLLER).to(UsersController);
  container.bind<IUsersBusinessLogic>(IDENTIFIER.USERS_BUSINESSLOGIC).to(UsersBusinessLogic);

  return container;
};

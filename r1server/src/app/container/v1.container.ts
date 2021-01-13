import { Container } from 'inversify';
import { IUsersBusinessLogic, UsersBusinessLogic } from '../api/v1/Users/Users.BusinessLogic';
import { IUsersController, UsersController } from '../api/v1/Users/Users.Controller';

export const createAppContainerV1 = (helperContainer: Container): Container => {
  const container = new Container();

  container.bind<IUsersController>('IUsersController').to(UsersController);

  container.bind<IUsersBusinessLogic>('IUsersBusinessLogic').to(UsersBusinessLogic);

  container.bind<Container>('HelperContainer').toConstantValue(helperContainer);

  return container;
};

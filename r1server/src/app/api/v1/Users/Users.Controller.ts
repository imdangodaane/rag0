import { HandlerDecorations, Lifecycle, Request, ResponseToolkit } from '@hapi/hapi';
import { inject, injectable } from 'inversify';
import { IDENTIFIER } from '../../../../helpers/utilites/identifier';
import { IUsersBusinessLogic } from './Users.BusinessLogic';

export interface IUsersController {
  createUser(): Lifecycle.Method | HandlerDecorations;
  retrieveUsers(): Lifecycle.Method | HandlerDecorations;
  retrieveUser(): Lifecycle.Method | HandlerDecorations;
  modifyUser(): Lifecycle.Method | HandlerDecorations;
  removeUser(): Lifecycle.Method | HandlerDecorations;
}

@injectable()
export class UsersController implements IUsersController {

  constructor(
    @inject(IDENTIFIER.USERS_BUSINESSLOGIC) private usersBL: IUsersBusinessLogic,
  ) {

  }

  public createUser() {
    return async (request: Request, h: ResponseToolkit) => {
      return h.response('Users: Create');
    };
  }

  public retrieveUsers() {
    return async (request: Request, h: ResponseToolkit) => {
      return h.response('Users: Retrieve');
    };
  }

  public retrieveUser() {
    return async (request: Request, h: ResponseToolkit) => {
      return h.response('Users Retrieve one');
    };
  }

  public modifyUser() {
    return async (request: Request, h: ResponseToolkit) => {
      return h.response('Users: Modify user');
    };
  }

  public removeUser() {
    return async (request: Request, h: ResponseToolkit) => {
      return h.response('Users: Remove');
    };
  }
}

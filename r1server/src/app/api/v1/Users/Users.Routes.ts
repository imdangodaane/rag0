import { inject, injectable } from 'inversify';
import { IUsersController } from './Users.Controller';
import { ServerRoute } from '@hapi/hapi';
import { IDENTIFIER } from '../../../../helpers/utilites/identifier';

export interface IUsersRoutes {
  getUsersRoutes(): ServerRoute[];
}

@injectable()
export class UsersRoutes implements IUsersRoutes {
  #usersRoutes!: ServerRoute[];

  private _createUserRoute() {
    return {
      method: 'POST',
      path: '/users',
      handler: this.usersCtrler.createUser(),
    };
  }

  private _retrieveUsersRoute() {
    return {
      method: 'GET',
      path: '/users',
      handler: this.usersCtrler.retrieveUsers(),
    };
  }

  private _retrieveUserRoute() {
    return {
      method: 'GET',
      path: '/user/{id}',
      handler: this.usersCtrler.retrieveUser(),
    };
  }

  private _modifyUserRoute() {
    return {
      method: 'PUT',
      path: '/user/{id}',
      handler: this.usersCtrler.modifyUser(),
    };
  }

  private _removeUserRoute() {
    return {
      method: 'DELETE',
      path: '/user/{id}',
      handler: this.usersCtrler.removeUser(),
    };
  }

  private _getAllRoutes(): ServerRoute[] {
    return [
      this._createUserRoute(),
      this._retrieveUsersRoute(),
      this._retrieveUserRoute(),
      this._modifyUserRoute(),
      this._removeUserRoute(),
    ];
  }

  constructor(
    @inject(IDENTIFIER.USERS_CONTROLLER) private usersCtrler: IUsersController,
  ) {
    this.#usersRoutes = this._getAllRoutes();
  }

  getUsersRoutes(): ServerRoute[] {
    return this.#usersRoutes;
  }
}

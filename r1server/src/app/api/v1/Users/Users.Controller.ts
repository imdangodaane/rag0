import hapi from '@hapi/hapi';
import { injectable } from 'inversify';

export interface IUsersController {
  getRoutes(): hapi.ServerRoute[];
}

@injectable()
export class UsersController implements IUsersController {
  #routes!: hapi.ServerRoute[];

  constructor() {
    this.#routes = [];

    this.attachRoutes();
  }

  getRoutes() {
    return this.#routes;
  }

  private attachRoutes() {
    this.#routes = [
      ...this.#routes,
      this.usersGetOneById(),
    ];

    return this.#routes;
  }

  private usersGetOneById(): hapi.ServerRoute {
    return {
      method: 'GET',
      path: '/users/{id}',
      handler: (request, h) => {
        return h.response({
          message: 'OK',
          data: 'Get user by ID',
        });
      },
    };
  }
}

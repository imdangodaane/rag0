import hapi from '@hapi/hapi';

export class Application {
  #server!: hapi.Server;
  #serverRoutes: hapi.ServerRoute[] = [];

  private _createServer(serverOptions: hapi.ServerOptions): hapi.Server {
    const server = hapi.server(serverOptions);
    return server;
  }

  constructor(serverOptions: hapi.ServerOptions) {
    this.#server = this._createServer(serverOptions);
  }

  async start() {
    this.#server.start()
      .then(
        () => console.log(`[${new Date().toLocaleString()}]\t[Application] started and listen on: ${this.#server.info.uri}`),
      );
  }

  attachRoutes(routes: hapi.ServerRoute[]): Application {
    this.#serverRoutes = [
      ...this.#serverRoutes,
      ...routes,
    ];

    this.#server.route(this.#serverRoutes);
    return this;
  }

  getServer(): hapi.Server {
    return this.#server;
  }
}

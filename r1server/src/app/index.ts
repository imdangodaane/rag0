import hapi from '@hapi/hapi';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export class Application {
  #server!: hapi.Server;
  #serverRoutes!: hapi.ServerRoute[];

  constructor() {
    this.#serverRoutes = [];
  }

  async start() {
    this.#server.start().then(() => {
      console.log(`[${new Date().toLocaleString()}]\t[Application] started and listen on: ${this.#server.info.uri}`);
    });
  }

  createServer(serverConfig: hapi.ServerOptions) {
    const server = hapi.server(serverConfig);
    this.#server = server;
    return server;
  }

  attachRoutes(routes: hapi.ServerRoute[]) {
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

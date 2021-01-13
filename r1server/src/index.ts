import { Container } from 'inversify';
import { Connection, createConnection } from 'typeorm';
import { Application } from './app';
import { createAppContainerV1 } from './app/container/v1.container';
import { createAppRoutesV1 } from './app/route/v1.routes.';
import { createHelperContainer } from './helpers/helper.container';
import { IBootstrapHelper } from './helpers/utilites/bootstrap';
import { IDENTIFIER } from './helpers/utilites/identifier';

const main = async () => {
  const mainContainer        = new Container();
  const helperContainer      = createHelperContainer();
  const applicationContainer = createAppContainerV1(helperContainer);

  mainContainer.bind<Container>(IDENTIFIER.HELPER_CONTAINER).toConstantValue(helperContainer);
  mainContainer.bind<Container>(IDENTIFIER.APPLICATION_CONTAINER).toConstantValue(applicationContainer);

  const bootstrapHelper = helperContainer.get<IBootstrapHelper>(IDENTIFIER.BOOTSTRAP_HELPER);

  const mongoDbConnectionOptions = await bootstrapHelper.getDbConnectionConfig(['src', 'config', 'mongodb.yml']);
  const mongoDbConnection        = await createConnection(mongoDbConnectionOptions);
  const mysqlDbConnectionOptions = await bootstrapHelper.getDbConnectionConfig(['src', 'config', 'mysql.yml']);
  const mysqlDbConnection        = await createConnection(mysqlDbConnectionOptions);

  applicationContainer.bind<Connection>(IDENTIFIER.MONGO_CONNECTION).toConstantValue(mongoDbConnection);
  applicationContainer.bind<Connection>(IDENTIFIER.MYSQL_CONNECTION).toConstantValue(mysqlDbConnection);

  const serverOptions = bootstrapHelper.getServerConfig();
  const app = new Application();
  app.createServer(serverOptions);
  app.attachRoutes(createAppRoutesV1(applicationContainer));
  app.start();
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

main();

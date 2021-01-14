import 'reflect-metadata';
import path from 'path';
import { Container } from 'inversify';
import { Application } from './app';
import { createAppContainerV1 } from './app/container/v1.container';
import { createAppRoutesV1 } from './app/route/v1.routes.';
import { createHelperContainer } from './helpers/helper.container';
import { IBootstrapHelper } from './helpers/utilites/bootstrap';
import { IDENTIFIER } from './helpers/utilites/identifier';
import { createDBConnection } from './connection';

const main = async () => {
  const mainContainer        = new Container();
  const helperContainer      = createHelperContainer();
  const applicationContainer = createAppContainerV1();

  mainContainer.bind<Container>(IDENTIFIER.HELPER_CONTAINER)
    .toConstantValue(helperContainer);
  mainContainer.bind<Container>(IDENTIFIER.APPLICATION_CONTAINER)
    .toConstantValue(applicationContainer);

  const bootstrapHelper = helperContainer.get<IBootstrapHelper>(IDENTIFIER.BOOTSTRAP_HELPER);

  const mongodbConfigFile        = path.resolve(path.join('src', 'config', 'mongodb.yml'));
  const mysqlConfigFile          = path.resolve(path.join('src', 'config', 'mysql.yml'));
  const mongodbConnectionOptions = await bootstrapHelper.loadDbConnectionConfig(mongodbConfigFile);
  const mysqlConnectionOptions   = await bootstrapHelper.loadDbConnectionConfig(mysqlConfigFile);
  const mongodbConnection        = await createDBConnection(mongodbConnectionOptions);
  const mysqlConnection          = await createDBConnection(mysqlConnectionOptions);

  applicationContainer.bind(IDENTIFIER.MONGO_CONNECTION).toConstantValue(mongodbConnection);
  applicationContainer.bind(IDENTIFIER.MYSQL_CONNECTION).toConstantValue(mysqlConnection);
  applicationContainer.bind(IDENTIFIER.HELPER_CONTAINER).toConstantValue(helperContainer);

  const serverOptions = bootstrapHelper.loadServerConfig();
  const app = new Application(serverOptions);
  app.attachRoutes(createAppRoutesV1(applicationContainer));
  app.start();
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

main();

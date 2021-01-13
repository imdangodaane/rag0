import { Container } from 'inversify';
import { ILogger, Logger } from './utilites/logger';
import { IFileHelper, FileHelper } from './utilites/file';
import { IParseHelper, ParseHelper } from './utilites/parse';
import { IYamlHelper, YamlHelper } from './utilites/yaml';
import { ConstantHelper, IConstantHelper } from './utilites/constant';
import { BootstrapHelper, IBootstrapHelper } from './utilites/bootstrap';

export const createHelperContainer = (): Container => {
  const container = new Container();

  container.bind<IConstantHelper>('IConstantHelper').to(ConstantHelper).inSingletonScope();
  container.bind<ILogger>('ILogger').to(Logger);
  container.bind<IFileHelper>('IFileHelper').to(FileHelper);
  container.bind<IParseHelper>('IParseHelper').to(ParseHelper);
  container.bind<IYamlHelper>('IYamlHelper').to(YamlHelper);
  container.bind<IBootstrapHelper>('IBootstrapHelper').to(BootstrapHelper);

  return container;
};

import { Container } from 'inversify';
import { ILogger, Logger } from './utilites/logger';
import { IFileHelper, FileHelper } from './utilites/file';
import { IParseHelper, ParseHelper } from './utilites/parse';
import { IYamlHelper, YamlHelper } from './utilites/yaml';
import { ConstantHelper, IConstantHelper } from './utilites/constant';
import { BootstrapHelper, IBootstrapHelper } from './utilites/bootstrap';
import { IDENTIFIER } from './utilites/identifier';
import { HttpHelper, IHttpHelper } from './utilites/http';

export const createHelperContainer = (): Container => {
  const container = new Container();

  container.bind<IConstantHelper>(IDENTIFIER.CONSTANT_HELPER).to(ConstantHelper).inSingletonScope();
  container.bind<ILogger>(IDENTIFIER.LOGGER).to(Logger);
  container.bind<IFileHelper>(IDENTIFIER.FILE_HELPER).to(FileHelper);
  container.bind<IParseHelper>(IDENTIFIER.PARSE_HELPER).to(ParseHelper);
  container.bind<IYamlHelper>(IDENTIFIER.YAML_HELPER).to(YamlHelper);
  container.bind<IBootstrapHelper>(IDENTIFIER.BOOTSTRAP_HELPER).to(BootstrapHelper);
  container.bind<IHttpHelper>(IDENTIFIER.HTTP_HELPER).to(HttpHelper);

  return container;
};

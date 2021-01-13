import path from 'path';
import hapi from '@hapi/hapi';
import { inject, injectable } from 'inversify';
import { ConnectionOptions } from 'typeorm';
import { IYamlHelper } from './yaml';
import { IConstantHelper, IDefaultConfig, IDefaultDatabaseConfig } from './constant';

export interface IBootstrapHelper {
  getServerConfig(configPath?: string[]): hapi.ServerOptions;
  getDbConnectionConfig(configPath: string[]): Promise<ConnectionOptions>;
}

@injectable()
export class BootstrapHelper implements IBootstrapHelper {
  constructor(
    @inject('IConstantHelper') private constantHelper: IConstantHelper,
    @inject('IYamlHelper') private yamlHelper: IYamlHelper,
  ) {

  }

  getServerConfig(configPath?: string[]): hapi.ServerOptions {
    let config: hapi.ServerOptions;
    const defaultConfig = this.constantHelper.defaultConfig;

    if (configPath) {
      const filePath = path.resolve(path.join(...configPath));

      const loadedConfig = this.yamlHelper.readYamlFile(filePath) as IDefaultConfig;

      config = {
        host: loadedConfig.SERVER.HOST,
        port: loadedConfig.SERVER.PORT,
      };
    } else {
      config = {
        host: defaultConfig.SERVER.HOST,
        port: defaultConfig.SERVER.PORT,
      };
    }

    return config;
  }

  async getDbConnectionConfig(configPath: string[]): Promise<ConnectionOptions> {
    const filePath = path.resolve(path.join(...configPath));

    const loadedConfig = this.yamlHelper.readYamlFile(filePath) as IDefaultDatabaseConfig;

    const dbConnectionOptions: ConnectionOptions = {
      name              : loadedConfig.DATABASE.NAME,
      type              : loadedConfig.DATABASE.TYPE as any,
      host              : loadedConfig.DATABASE.HOST,
      port              : loadedConfig.DATABASE.PORT,
      username          : loadedConfig.DATABASE.USERNAME,
      password          : loadedConfig.DATABASE.PASSWORD,
      database          : loadedConfig.DATABASE.DATABASE,
      cache             : loadedConfig.DATABASE.CACHE,
      synchronize       : loadedConfig.DATABASE.SYNCHRONIZE,
      logging           : loadedConfig.DATABASE.LOGGING,
      useUnifiedTopology: loadedConfig.DATABASE.USE_UNIFIED_TOPOLOGY,
      cli               : loadedConfig.DATABASE.CLI,
      entities          : loadedConfig.DATABASE.ENTITIES,
      migrations        : loadedConfig.DATABASE.MIGRATIONS,
      subscribers       : loadedConfig.DATABASE.SUBSCRIBERS,
    };

    return dbConnectionOptions;
  }
}

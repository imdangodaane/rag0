import hapi from '@hapi/hapi';
import fs from 'fs';
import { inject, injectable } from 'inversify';
import { ConnectionOptions } from 'typeorm';
import { IYamlHelper } from './yaml';
import { IConstantHelper, IDefaultConfig, IDefaultDatabaseConfig } from './constant';

export interface IBootstrapHelper {
  loadServerConfig(configPath?: string): hapi.ServerOptions;
  loadDbConnectionConfig(configPath: string): Promise<ConnectionOptions>;
}

@injectable()
export class BootstrapHelper implements IBootstrapHelper {
  constructor(
    @inject('IConstantHelper') private constantHelper: IConstantHelper,
    @inject('IYamlHelper') private yamlHelper: IYamlHelper,
  ) {

  }

  loadServerConfig(configPath?: string): hapi.ServerOptions {
    const defaultConfig = this.constantHelper.getDefaultConfig();

    let config: hapi.ServerOptions = {
      host: defaultConfig.SERVER.HOST,
      port: defaultConfig.SERVER.PORT,
    };

    if (configPath && fs.existsSync(configPath)) {
      const loadedConfig = this.yamlHelper.readYamlFile(configPath) as IDefaultConfig;

      config = {
        host: loadedConfig.SERVER.HOST,
        port: loadedConfig.SERVER.PORT,
      };
    }

    return config;
  }

  async loadDbConnectionConfig(configPath: string): Promise<ConnectionOptions> {
    if (!fs.existsSync(configPath)) {
      throw new Error(`${new Date().toDateString()}:\t - DB Connection with configPath = '${configPath}' was not exist.`);
    }

    const loadedConfig = this.yamlHelper.readYamlFile(configPath) as IDefaultDatabaseConfig;

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

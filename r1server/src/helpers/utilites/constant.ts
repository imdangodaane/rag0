import { inject, injectable } from 'inversify';
import { IYamlHelper } from './yaml';
import path from 'path';

export type IServerConfig = {
  SERVER: {
    HOST: string,
    PORT: string,
  };
};

export interface IDefaultConfig extends IServerConfig {}

export interface IDefaultDatabaseConfig {
  DATABASE: {
    NAME: string,
    TYPE: string,
    HOST: string,
    PORT: number,
    USERNAME?: string,
    PASSWORD?: string,
    DATABASE?: string,
    CACHE?: boolean,
    SYNCHRONIZE?: boolean,
    LOGGING?: boolean,
    USE_UNIFIED_TOPOLOGY?: boolean,
    CLI?: {
      migrationsDir: string,
    },
    ENTITIES?: string[],
    MIGRATIONS?: string[],
    SUBSCRIBERS?: string[],
  };
}

export interface IConstantHelper {
  getDefaultConfig(): IDefaultConfig;
}

@injectable()
export class ConstantHelper implements IConstantHelper {
  #defaultConfigPath: string;
  #defaultConfig!: IDefaultConfig;

  constructor(
    @inject('IYamlHelper') private yamlHelper: IYamlHelper,
  ) {
    this.#defaultConfigPath = path.resolve(path.join(
      'src',
      'config',
      'default.yml',
    ));
    this.#defaultConfig = this.loadConfig(this.#defaultConfigPath);
  }

  public loadConfig(path: string) {
    return this.yamlHelper.readYamlFile(path) as IServerConfig;
  }

  public getDefaultConfig(): IDefaultConfig {
    return this.#defaultConfig;
  }
}

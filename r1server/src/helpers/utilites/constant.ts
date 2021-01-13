import { inject, injectable } from 'inversify';
import { IYamlHelper } from './yaml';
import path from 'path';
import { DatabaseType } from 'typeorm';

export interface IDefaultConfig {
  SERVER: {
    HOST: string,
    PORT: string,
  };
}

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
  defaultConfig: IDefaultConfig;
  readYamlConfig(path: string): string | object | undefined;
}

@injectable()
export class ConstantHelper implements IConstantHelper {
  #defaultConfigPath: string = path.resolve(path.join(
    'src', 'config', 'default.yml',
  ));
  #defaultConfig!: IDefaultConfig;

  constructor(
    @inject('IYamlHelper') private yamlHelper: IYamlHelper,
  ) {
    this.readDefaultConfig();
  }

  private readDefaultConfig(): void {
    this.#defaultConfig = this.readYamlConfig(this.#defaultConfigPath) as IDefaultConfig;
  }

  public get defaultConfig(): IDefaultConfig {
    return this.#defaultConfig;
  }

  readYamlConfig(path: string): string | object | undefined {
    return this.yamlHelper.readYamlFile(path);
  }
}

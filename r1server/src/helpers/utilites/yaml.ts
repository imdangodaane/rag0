import { inject, injectable } from 'inversify';
import jsYaml from 'js-yaml';
import { ILogger } from './logger';
import { IFileHelper } from './file';

export interface IYamlHelper {
  readYamlFile(path: string): string | object | undefined;
}

@injectable()
export class YamlHelper implements IYamlHelper {
  constructor(
    @inject('ILogger') private logger: ILogger,
    @inject('IFileHelper') private fileHelper: IFileHelper,
  ) {

  }

  readYamlFile(path: string): string | object | undefined {
    try {
      const fileContent = this.fileHelper.readFile(path);
      if (!fileContent) {
        this.logger.error('Failed to read file content');
        return;
      }

      const doc = jsYaml.safeLoad(fileContent);
      return doc;

    } catch (e) {
      this.logger.error(e);

      return;
    }
  }
}

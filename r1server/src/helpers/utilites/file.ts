import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger';

export interface IFileHelper {
  readFile(path: string): string | undefined;
  writeToFile(path: string, content: string): void | undefined;
}

@injectable()
export class FileHelper implements IFileHelper {
  constructor(
    @inject('ILogger') private logger: ILogger,
  ) {

  }

  private resolvePath(pathString: string): string {
    return path.resolve(pathString);
  }

  private isExist(pathString: string): boolean {
    try {
      return fs.existsSync(pathString);
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  readFile(pathString: string): string | undefined {
    try {
      const resolvedPath = this.resolvePath(pathString);

      if (!this.isExist(resolvedPath)) return;

      const content = fs.readFileSync(resolvedPath, 'utf8');

      return content;
    } catch (e) {
      this.logger.error('Failed to read file');

      return;
    }
  }

  writeToFile(pathString: string, content: string): void | undefined {
    try {
      const resolvedPath = this.resolvePath(pathString);

      if (!this.isExist(resolvedPath)) return;

      fs.writeFileSync(resolvedPath, content);
    } catch (e) {
      this.logger.error('Failed to write content to file');

      return;
    }
  }
}

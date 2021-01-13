import { inject, injectable } from 'inversify';
import { ILogger } from './logger';

export interface IParseHelper {
  str2obj(str: string): object | undefined;
}

@injectable()
export class ParseHelper implements IParseHelper {
  constructor(
    @inject('ILogger') private logger: ILogger,
  ) {

  }

  str2obj(str: string): object | undefined {
    try {
      const parsedStr = JSON.parse(str);

      return parsedStr;

    } catch (e) {
      this.logger.error(e);

      return;
    }
  }
}

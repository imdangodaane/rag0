import { injectable } from 'inversify';

export interface ILogger {
  debug(message: string, details?: any): void;
  info(message: string, details?: any): void;
  warning(message: string, details?: any): void;
  error(message: string, details?: any): void;
  critical(message: string, details?: any): void;
  setLogToConsole(): void;
  unsetLogToConsole(): void;
  setLogToFile(): void;
  unsetLogToFile(): void;
}

export enum LOG_LEVEL {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

@injectable()
export class Logger implements ILogger {
  #logToConsole: boolean = true;
  #logToFile: boolean = false;
  #filePath: string = './log';

  constructor() {}

  setLogToConsole(): void {
    this.#logToConsole = true;
  }

  unsetLogToConsole(): void {
    this.#logToConsole = false;
  }

  setLogToFile(): void {
    this.#logToFile = true;
  }

  unsetLogToFile(): void {
    this.#logToFile = false;
  }

  private log(level: LOG_LEVEL, message: string, details?: any) {
    if (this.#logToConsole) {
      console.log(`[${new Date().toLocaleString()}] ${level.toLocaleUpperCase()}\t${message}`);
    }
  }

  debug(message: string, details?: any) {
    this.log(LOG_LEVEL.DEBUG, message, details);
  }

  info(message: string, details?: any) {
    this.log(LOG_LEVEL.INFO, message, details);
  }

  warning(message: string, details?: any) {
    this.log(LOG_LEVEL.WARNING, message, details);
  }

  error(message: string, details?: any) {
    this.log(LOG_LEVEL.ERROR, message, details);
  }

  critical(message: string, details?: any) {
    this.log(LOG_LEVEL.CRITICAL, message, details);
  }
}

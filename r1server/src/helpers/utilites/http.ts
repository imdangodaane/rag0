import { injectable } from 'inversify';

export interface IHttpHelper {

}

@injectable()
export class HttpHelper implements IHttpHelper {
  HTTP_METHODS = {
    GET    : 'GET',
    POST   : 'POST',
    PUT    : 'PUT',
    PATCH  : 'PATCH',
    DELETE : 'DELETE',
    HEAD   : 'HEAD',
    OPTIONS: 'OPTIONS',
    CONNECT: 'CONNECT',
    TRACE  : 'TRACE',
  };

  constructor() {

  }
}

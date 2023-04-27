export class ErrorNotFound extends Error {
  constructor() {
    super();

    this.code = 'E002';
    this.statusCode = 404;
    this.message = 'Resource not found.';
  }
}

export class ErrorBadRequest extends Error {
  constructor() {
    super();
  
    this.code = 'E001';
    this.statusCode = 400;
    this.message = 'Missing fields.';
  }
}
  
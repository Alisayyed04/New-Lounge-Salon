export class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // sets err.message
    this.status = statusCode; // custom status code
  }
}

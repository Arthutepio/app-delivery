class GenericError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.stack = statusCode;
  }
}

module.exports = GenericError;
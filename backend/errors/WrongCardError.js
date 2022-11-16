class WrongCardError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = WrongCardError;

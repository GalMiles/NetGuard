class MissingAttributeError extends Error {
    status: number;
    constructor(attribute: string) {
      super(`Missing attribute: ${attribute}`);
      this.status = 400;
    }
  }
  
  class InvalidAttributeError extends Error {
    status: number;
    constructor(attribute: string) {
      super(`Invalid attribute: ${attribute}`);
      this.status = 400;
    }
  }
  
  export { MissingAttributeError, InvalidAttributeError };
  
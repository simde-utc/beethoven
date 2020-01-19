export class BaseModel {
  constructor(values) {
    Object.assign(this, values)
  }

  getKey() {
    return this.id;
  }
}

export class APIError extends Error {
  constructor(message, response, data) {
    super();
    this.message = message;
    this.response = response;
    this.data = data;
  }

  get status() {
    return this.response.status;
  }

  getMessage() {
    return this.message;
  }

  getData() {
    return this.data;
  }
}

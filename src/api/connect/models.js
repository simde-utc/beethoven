/*Class For the authenticated user*/

export class User {
  constructor({
    sessionid,
    username
  }) {
    this.username = username;
    this.sessionid = sessionid;
  }

  getKey() {
    return this.username;
  }

  getUsername() {
    return this.username;
  }

  getSessionID() {
    return this.sessionid;
  }
}

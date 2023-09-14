/* Class for the BlockedUsers model*/

class BlockedUsers {
  constructor({
    blocked_users
  }) {
    this.blocked_users = blocked_users;
  }

  getKey() {
    return 'blocked_users';
  }

  getUsers() {
    return Object.entries(this.blocked_users).map(([,user]) => new BlockedUser(user))
  }
}
class BlockedUser {
  constructor({
    id,
    badge_uid,
    name,
    justification,
    date
  }) {
    this.id = id;
    this.badge_uid = badge_uid;
    this.name = name;
    this.justification = justification;
    this.date = date;
  }

  getKey() {
    return this.id;
  }

  getBadgeUID() {
    return this.badge_uid;
  }

  getName() {
    return this.name;
  }

  getJustification() {
    return this.justification;
  }

  getDate() {
    return this.date;
  }
}

export default BlockedUsers;

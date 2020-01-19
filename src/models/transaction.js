/*Class for Transaction Weezevent Model*/

class Transaction {
  constructor({
    error,
    id,
    ticket,
    solde,
    firstname,
    lastname,
    username,
  }) {
    this.error = error;
    this.id = id;
    this.ticket = ticket;
    this.solde = solde || 0;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username=  username;
  }

  getKey() {
    return this.id;
  }

  getError() {
    if(this.error && this.error.message) {
      return this.error.message;
    }
    return null;
  }

  getTicket() {
    return this.ticket;
  }

  getSolde() {
    return this.solde/100;
  }

  getFirstname() {
    return this.firstname;
  }

  getLastname() {
    return this.lastname;
  }

  getUsername() {
    return this.username;
  }
}

export default Transaction;

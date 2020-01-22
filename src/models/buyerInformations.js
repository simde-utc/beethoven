/*Class to get buyer infos from Weezevent API*/

class BuyerInformations {
  constructor({
    username,
    firstname,
    lastname,
    solde,
    last_purchases,
    groups,
  }) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.solde = solde;
    this.last_purchases = last_purchases;
    this.groups = groups;
  }

  getKey() {
    return this.username;
  }

  getUsername() {
    return this.username;
  }

  getFirstname() {
    return this.firstname;
  }

  getLastname() {
    return this.lastname;
  }

  getSolde() {
    return this.solde/100;
  }

  getLastPurchases() {
    if(this.last_purchases && this.last_purchases.length) {
      return this.last_purchases.map(purchase => new Purchase(purchase));
    }
    return [];
  }

  getGroups() {
    return this.groups;
  }

  getJson() {
    return {
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      solde: this.solde,
      last_purchases: this.last_purchases,
      groups: this.groups,
    }
  }
}


export class Purchase {
  constructor({
    pur_id,
    pur_qte,
    obj_id,
    pur_removed,
    pur_date,
    article,
    pur_price,
  }) {
    this.id = pur_id;
    this.obj = obj_id;
    this.qte = pur_qte;
    this.removed = pur_removed;
    this.date = pur_date;
    this.article = article;
    this.price = pur_price;
  }

  getKey() {
    return this.id;
  }

  getObj() {
    return this.obj;
  }

  getArticle() {
    return this.article
  }

  setArticle(article) {
    this.article = article;
  }

  getQte() {
    return this.qte;
  }

  getRemoved() {
    return this.removed;
  }

  getDate() {
    return this.date;
  }

  getPrice() {
    return this.price/100;
  }
}

export default BuyerInformations;

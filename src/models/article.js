/* Class for Article Weezevent model*/

class Article {
  constructor({
    id,
    name,
    categorie_id,
    fundation_id,
    image_url,
    price
  }) {
    this.id = id;
    this.name = name;
    this.categorie_id = categorie_id;
    this.fundation_id = fundation_id;
    this.image_url = image_url;
    this.price = price || 0;
  }

  getKey() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCategoryID() {
    return this.categorie_id;
  }

  getFunID() {
    return this.fundation_id;
  }

  getImageURL() {
    return this.image_url;
  }

  getPrice() {
    return this.price/100;
  }
}

export default Article;

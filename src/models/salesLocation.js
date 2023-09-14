/*Class for SaleLocations Weezevent Model*/

class SalesLocation {
  constructor({
    id,
    name,
    categories
  }) {
    this.id = id;
    this.name = name;
    this.categories = categories || [];
  }

  getKey() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCategories() {
    return this.categories;
  }
}

export default SalesLocation;

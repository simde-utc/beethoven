/* Class for category Weezevent Model */
class Category {
  constructor({
    id,
    name,
    fundation_id
  }) {
    this.id = id;
    this.name = name;
    this.fun_id = fundation_id;
  }

  getKey() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getFunID() {
    return this.fun_id;
  }
}

export default Category;

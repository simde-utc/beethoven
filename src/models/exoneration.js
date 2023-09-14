/* Class for the Exoneration model*/

class Exoneration {
  constructor({
    id,
  }) {
    this.id = id;
  }

  getKey() {
    return this.id;
  }
}

export default Exoneration;

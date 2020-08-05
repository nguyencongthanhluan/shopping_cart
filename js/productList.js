function ProductList() {
  this.arr = [];
  this.addProduct = function (product) {
    this.arr.push(product);
  };
  this.findIndexProduct = function (id) {
    var index = -1;
    index = this.arr.findIndex(function (item) {
      return parseInt(item.id) === parseInt(id);
    });
    return index;
  };
}

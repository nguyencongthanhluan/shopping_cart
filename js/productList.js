function ProductList() {
  this.arr = [];
  this.addProduct = function (product) {
    this.arr.push(product);
  };
  this.getProductById = function (id) {
    var product;
    product = this.arr.find(function (item) {
      return parseInt(item.id) === parseInt(id);
    });
    return product;
  };
  this.findType = function (key) {
    var arr1 = [];
    var j = 0;
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].type.toLowerCase() === key) {
        arr1[j] = this.arr[i];
        j++;
      }
    }
    return arr1;
  };
}

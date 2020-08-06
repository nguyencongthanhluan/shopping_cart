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
  this.findType = function (key) {
    var arr1 = [];
    var j = 0;
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i].type === key) {
        arr1[j] = this.arr[i];
        return arr1;
      }
    }
    return null;
  };
}

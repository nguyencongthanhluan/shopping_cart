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
  this.searchProduct = function (keyWord) {
    var mangTimKiem = [];
    mangTimKiem = this.arr.filter(function (item) {
      return item.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
    });
    return mangTimKiem;
  };
}

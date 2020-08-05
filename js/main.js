var productList = new ProductList();

const renderProduct = function (list = productList.arr) {
  var htmlContent = "";
  for (var i = 0; i < list.length; i++) {
    //template string
    var rating = this.showRating(list[i].rating);
    htmlContent += `<div class="col-4">
        <img src=${list[i].image} /> 
        <h3>${list[i].name}</h3>
        <p>${list[i].description}</p>
        <h5>${list[i].price} $</h5>
        <span>${list[i].invetory}</span>
        <p>${rating}</p>
        <button class="btn btn-success">ADD TO CART</button>
      </div>`;
  }
  document.getElementById("listProduct").innerHTML = htmlContent;
};

//get list product
const fetchProduct = function () {
  //ham xu ly khi lay du lieu thanh cong
  const resolver = function (res) {
    console.log(res);
    productList.arr = res.data;
    renderProduct();
  };
  //ham xu ly khi that bai
  const rejecter = function (err) {
    console.log(err);
  };
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(resolver)
    .catch(rejecter);
};
fetchProduct();

getEle("search").addEventListener("keyup", function () {
  var keyWord = getEle("search").value;
  var mangTimKiem = productList.searchProduct(keyWord);
  console.log(mangTimKiem);
  renderProduct(mangTimKiem);
});

function getEle(id) {
  return document.getElementById(id);
}
function showRating(rating) {
  var result = [];
  for (var i = 0; i <= rating; i++) {
    result.push(`<i class="fas fa-star"></i>`);
  }
  for (var j = 0; j <= 5 - rating; j++) {
    result.push(`<i class="far fa-star"></i>`);
  }
  return result;
}

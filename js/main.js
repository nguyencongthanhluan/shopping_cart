var productList = new ProductList();

const renderProduct = function () {
  var htmlContent = "";

  for (var i = 0; i < productList.length; i++) {
    //template string
    htmlContent += `<div>
        <img src=${productList[i].image} /> 
        <h3>${productList[i].name}</h3>
        <p>${productList[i].description}</p>
        <p>${productList[i].price}</p>
        <span>${productList[i].invetory}</span>
        <p>${productList[i].raiting}</p>
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
// fetchProduct();

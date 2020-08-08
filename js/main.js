var productList = new ProductList();

const renderProduct = function (list = productList.arr) {
  var htmlContent = "";
  for (var i = 0; i < list.length; i++) {
    //template string
    var rating = this.showRating(list[i].rating);
    htmlContent += `<div class="col-4 pb-3 mt-3" style="border: 1px solid">
        <img src=${list[i].image} /> 
        <h3>${list[i].name}</h3>
        <p>${list[i].description}</p>
        <h5>${list[i].price} $</h5>
        <span>${list[i].inventory}</span>
        <p>${rating}</p>
        <p>${list[i].type}</p>
        <button class="btn btn-success">ADD TO CART</button>
      </div>`;
  }
  document.getElementById("listProduct").innerHTML = htmlContent;
};
//
const renderCart = function (list = productList.arr) {
  var htmlContent = "";
  for (var i = 0; i < list.length; i++) {
    //template string
    htmlContent += `<tr>
		<td>${i + 1}</td>
		<td> <img src=${list[i].image} /> </td>
		<td>${list[i].name}</td>
		<td>${list[i].price}</td>
    <td>${list[i].inventory}</td>
    <td>"tong tien"</td>
    <td><button class="btn btn-info">x</button></td>
		<td><button class="btn btn-info"></button></td>
    </tr>`;
  }
  document.getElementById("tableCart").innerHTML = htmlContent;
};

//get list product
const fetchProduct = function () {
  //ham xu ly khi lay du lieu thanh cong
  const resolver = function (res) {
    console.log(res);
    productList.arr = res.data;
    renderProduct(productList.arr);
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

// 1.1: sort
function sortAToZ(arr) {
  // var arr = [];
  arr.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // name trùng nhau
    return 0;
  });
}
function sortZToA(arr) {
  // var arr = [];
  arr.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // bỏ qua hoa thường
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    // name trùng nhau
    return 0;
  });
}
const sortProduct = function () {
  var key = getEle("sapxep").value;
  var arrSort = productList.arr;
  if (key === "az") {
    // console.log(arrSort);
    var a = sortAToZ(arrSort);
    renderProduct(a);
  } else if (key === "za") {
    var a = sortZToA(arrSort);
    renderProduct(a);
  }
};
function getEle(id) {
  return document.getElementById(id);
}
function showRating(rating) {
  var result = [];
  for (var i = 1; i <= rating; i++) {
    result.push(`<i class="fas fa-star"></i>`);
  }
  for (var j = 1; j <= 5 - rating; j++) {
    result.push(`<i class="far fa-star"></i>`);
  }
  return result;
}

//find type
const findTypes = function () {
  var obj = getEle("timkiem").value;
  if (obj === "") {
  } else if (obj === "ss") {
    var mang = productList.findType("samsung");
    console.log(mang);
    renderProduct(mang);
  } else if (obj === "ip") {
    var mang = productList.findType("iphone");
    console.log(mang);
    renderProduct(mang);
  }
};

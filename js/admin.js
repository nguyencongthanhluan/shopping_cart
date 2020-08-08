var productList = new ProductList();

const addProduct = function () {
  const id = getEle("id").value;
  const image = getEle("image").value;
  const name = getEle("name").value;
  const description = getEle("description").value;
  const price = getEle("price").value;
  const inventory = getEle("inventory").value;
  const rating = getEle("rating").value;
  const type = getEle("type").value;

  const newProduct = {
    id: id,
    image: image,
    name: name,
    description: description,
    price: price,
    inventory: inventory,
    rating: rating,
    type: type,
  };
  axios({
    method: "POST",
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    data: newProduct,
  })
    .then(function (res) {
      console.log(res);
      fetchProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
};
function deleteProduct(id) {
  axios({
    method: "DELETE",
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
  })
    .then(function (res) {
      fetchProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function editProduct(id) {
  var product = productList.getProductById(id);

  getEle("id").value = product.id;
  getEle("image").value = product.image;
  getEle("name").value = product.name;
  getEle("description").value = product.description;
  getEle("price").value = product.price;
  getEle("inventory").value = product.inventory;
  getEle("rating").value = product.rating;
  getEle("type").value = product.type;
}
function updateProduct() {
  const id = getEle("id").value;
  const image = getEle("image").value;
  const name = getEle("name").value;
  const description = getEle("description").value;
  const price = getEle("price").value;
  const inventory = getEle("inventory").value;
  const rating = getEle("rating").value;
  const type = getEle("type").value;

  const product = {
    id: id,
    image: image,
    name: name,
    description: description,
    price: price,
    inventory: inventory,
    rating: rating,
    type: type,
  };

  axios({
    method: "PUT",
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
    data: product,
  })
    .then(function (res) {
      fetchProduct();
    })
    .catch(function (err) {
      console.log(err);
    });
}
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
        <button class="btn btn-info" onclick="editProduct(${list[i].id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct(${list[i].id})">Delete</button>
      </div>`;
  }
  document.getElementById("listProduct").innerHTML = htmlContent;
};

//get list product
const fetchProduct = function () {
  //ham xu ly khi lay du lieu thanh cong
  const resolver = function (res) {
    console.log(res.data);
    productList.arr = res.data;
    renderProduct();
  };
  //ham xu ly khi that bai
  const rejecter = function (err) {
    console.log(err);
  };
  axios({
    method: "GET",
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
  })
    .then(resolver)
    .catch(rejecter);
};
fetchProduct();

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

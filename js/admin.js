var productList = new ProductList();
var validation = new Validation();

const addProduct = function () {
  const id = getEle("id").value;
  const image = getEle("image").value;
  const name = getEle("name").value;
  const description = getEle("description").value;
  const price = getEle("price").value;
  const inventory = getEle("inventory").value;
  const rating = getEle("rating").value;
  const type = getEle("type").value;

  var isValid = true;
  //checkId
  isValid &=
    validation.checkEmpty(id, "Mời nhập mã sản phẩm", "tb-id") &&
    validation.checkLength(id, "Nhập < 100", "tb-id", 0, 3) &&
    validation.checkNumber(id, "Mời nhập số", "tb-id") &&
    validation.checkTrungMa(
      id,
      "Mã bị trùng, mời nhập mã khác",
      "tb-id",
      productList.arr
    );
  //checkImage
  isValid &=
    validation.checkEmpty(image, "Mời nhập link hình ảnh", "tb-image") &&
    validation.checkTrungHinh(
      image,
      "Hình bị trùng, mời nhập hình khác",
      "tb-image",
      productList.arr
    );
  //checkName
  isValid &=
    validation.checkEmpty(name, "Mời nhập tên sản phẩm", "tb-name") &&
    validation.checkTrungTen(
      name,
      "Tên bị trùng, mời nhập tên khác",
      "tb-name",
      productList.arr
    ) &&
    validation.checkLength(name, "Nhập < 20 ký tự", "tb-name", 0, 21);
  //checkDescription
  isValid &=
    validation.checkEmpty(
      description,
      "Nhập mô tả sản phẩm",
      "tb-description"
    ) &&
    validation.checkLength(
      description,
      "Nhập < 50 ký tự",
      "tb-description",
      0,
      51
    );
  //checkPrice
  isValid &=
    validation.checkEmpty(price, "Nhập giá sản phẩm", "tb-price") &&
    validation.checkNumber(price, "Mời nhập số", "tb-price") &&
    validation.checkLength(price, "Nhập < 100", "tb-price", 0, 3);
  //checkInventory
  isValid &=
    validation.checkEmpty(inventory, "Nhập hàng tồn kho", "tb-inventory") &&
    validation.checkNumber(inventory, "Mời nhập số", "tb-inventory") &&
    validation.checkLength(inventory, "Nhập < 100", "tb-inventory", 0, 3);
  //checkRating
  isValid &=
    validation.checkEmpty(rating, "Nhập số sao", "tb-rating") &&
    validation.checkNumber(rating, "Mời nhập số", "tb-rating") &&
    validation.checkRating(rating, "Mời nhập <= 5", "tb-rating");
  //checkType
  isValid &=
    validation.checkEmpty(type, "Nhập samsung hoặc iphone", "tb-type") &&
    validation.checkType(type, "Nhập samsung hoặc iphone", "tb-type");

  if (!isValid) {
    return;
  }

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

function sortAZ(arr) {
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
function sortZA(arr) {
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
    var mang = sortAZ(arrSort);
    renderProduct(mang);
  } else if (key === "za") {
    var mangDaoNguoc = sortZA(arrSort);
    renderProduct(mangDaoNguoc);
  }
};
function getEle(id) {
  return document.getElementById(id);
}
function showRating(rating) {
  var result = [];
  if (rating <= 5) {
    for (var i = 1; i <= rating; i++) {
      result.push(`<i class="fas fa-star"></i>`);
    }
    for (var j = 1; j <= 5 - rating; j++) {
      result.push(`<i class="far fa-star"></i>`);
    }
  } else {
    rating = 5;
    for (var i = 1; i <= rating; i++) {
      result.push(`<i class="fas fa-star"></i>`);
    }
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

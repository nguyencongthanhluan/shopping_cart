var productList = new ProductList();

const renderProduct = function (list = productList.arr) {
  var htmlContent = "";
  for (var i = 0; i < list.length; i++) {
    //template string
    var rating = this.showRating(list[i].rating);
    htmlContent += `<div class="col-4 pb-3 mt-3" style="border: 1px solid">
        <img class="pt-3" src=${list[i].image} /> 
        <h3>${list[i].name}</h3>
        <p>${list[i].description}</p>
        <h5>${list[i].price} $</h5>
        <span>${list[i].inventory}</span>
        <p>${rating}</p>
        <p>${list[i].type}</p>
        <button class="btn btn-success"  onclick="addCart(${list[i].id})" >ADD TO CART</button>
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
//show rating
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
  } else if (obj === "none") {
    renderProduct(productList.arr);
  }
};

//render cart
var cartList = [];
var sum = 0;

const renderCart = function (list = cartList.arr) {
  var htmlContent = "";
  for (var i = 0; i < list.length; i++) {
    //template string
    htmlContent += `<tr>
		<td>${i + 1}</td>
		<td> <img src=${list[i].image} /> </td>
		<td>${list[i].name}</td>
		<td>${list[i].price}</td>
    <td>${list[i].quantity}
         <div class="btn-group">
            <button class="btn btn-info border-right" onclick="downButton(${
              list[i].id
            })" >-</button>
            <button class="btn btn-info border-left" onclick="upButton(${
              list[i].id
            })">+</button>
        </div>
    </td>
    <td id="calcSum">${list[i].price * list[i].quantity}</td>
    <td><button class="btn btn-info" onclick="removeProductInCart(${
      list[i].id
    })" >x</button></td>
    
    </tr>`;
  }
  htmlContent += `<tr>
    <td></td>
    <td></td>
    <td></td>
    <td style="font-size: 30px;" class="font-weight-bold">
      Tổng Tiền: ${sum} VND
    </td>
    <td style="font-size: 30px;" class="font-weight-bold" >
    </td>
    <td>
      <button style="font-size: 30px;" class="btn btn-info" onclick="clearCart()" >
        Thanh Toán
      </button>
    </td>
</tr>`;
  document.getElementById("tableCart").innerHTML = htmlContent;
};

const total = function () {
  sum = 0;
  console.log(cartList);
  for (var i = 0; i < cartList.length; i++) {
    sum = sum + cartList[i].price * cartList[i].quantity;
  }
};
//add to cart
const addCart = function (id) {
  getEle("thongbao").innerHTML = "Thêm vào giỏ hàng thành công!";
  const arrCart = productList.getProductById(id);
  const Id = arrCart.id;
  const image = arrCart.image;
  const name = arrCart.name;
  const description = arrCart.description;
  const price = arrCart.price;
  const inventory = arrCart.inventory;
  const rating = arrCart.rating;
  const type = arrCart.type;

  const cartItem = {
    id: Id,
    image: image,
    name: name,
    description: description,
    price: price,
    inventory: inventory,
    rating: rating,
    type: type,
    quantity: 1,
  };

  console.log(cartList);
  if (cartList.length == 0) {
    cartList.push(cartItem);
  } else {
    let newArr = cartList.filter((item) => {
      return cartItem.id === item.id;
    });
    if (newArr.length > 0) {
      for (var i = 0; i < cartList.length; i++) {
        if (cartList[i].id === newArr[0].id) {
          alert("Sản phẩm này đã có trong giỏ hàng");
          cartList[i].quantity++;
        }
      }
    } else {
      cartList.push(cartItem);
    }
  }
  total();
  renderCart(cartList);
  setLocalStorage();
};

const upButton = function (id) {
  for (var i = 0; i < cartList.length; i++) {
    if (cartList[i].id == id) {
      cartList[i].quantity++;
    }
  }
  total();
  renderCart(cartList);
  setLocalStorage();
};

const downButton = function (id) {
  for (var i = 0; i < cartList.length; i++) {
    if (cartList[i].id == id) {
      cartList[i].quantity--;
      if (cartList[i].quantity <= 0) {
        removeProductInCart(id);
      }
    }
  }
  total();
  renderCart(cartList);
  setLocalStorage();
};
//get index cart
const getCartById = function (id) {
  var index = -1;
  index = cartList.findIndex(function (item) {
    return parseInt(item.id) === parseInt(id);
  });
  return index;
};
//delete product in cart
const removeProductInCart = function (id) {
  getEle("thongbao").innerHTML = "Xóa sản phẩm thành công!";
  var vitri = getCartById(id);
  if (vitri !== -1) {
    cartList.splice(vitri, 1);
    total();
    renderCart(cartList);
    setLocalStorage();
  }
};

//localStorage
function setLocalStorage() {
  localStorage.setItem("ListCart", JSON.stringify(cartList));
  localStorage.setItem("sum", JSON.stringify(sum));
}

function getLocalStorage() {
  if (localStorage.getItem("ListCart")) {
    cartList = JSON.parse(localStorage.getItem("ListCart"));
    sum = JSON.parse(localStorage.getItem("sum"));
    renderCart(cartList);
  }
}

//clear cart
const clearCart = function () {
  if (cartList.length > 0) {
    cartList = [];
    getEle("thongbao").innerHTML = "Bạn đã mua hàng thành công!";
    total();
    renderCart(cartList);
    setLocalStorage();
  } else {
    alert("Vui lòng thêm sản phẩm vào giỏ hàng");
  }
};
getLocalStorage();

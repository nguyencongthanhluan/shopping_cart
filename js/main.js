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
        <span>${list[i].quantity}</span>
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
            <button class="btn btn-info border-right" onclick="onUpdateQuantity(${
              (list[i].id, list[i].quantity - 1)
            })" >-</button>
            <button class="btn btn-info border-left" onclick="onUpdateQuantity(${
              (list[i].id, list[i].quantity + 1)
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
      Tổng Tiền
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

//add to cart
const addCart = function (id) {
  alert("Bạn đã chọn một sản phẩm");
  document.getElementById("cartArr_content").style.display = "block";
  var arrCart = productList.getProductById(id);
  var image = arrCart.image;
  var name = arrCart.name;
  var price = arrCart.price;
  var quantity = arrCart.quantity;
  var id = arrCart.id;
  var cartNew = new CartList(image, name, price, quantity, id);
  cartList.push(cartNew);
  console.log(cartList);
  renderCart(cartList);
  setLocalStorage();
};

// const calcTotalAmount = function (cart) {
//   // var total = 0;
//   // if (cart.length > 0) {
//   //   for (var i = 0; i < cart.length; i++) {
//   //     total += cart[i].price * cart[i].inventory;
//   //   }
//   // }
//   // return total;
//   var tong = document.getElementById("calcSum");
//   console.log(tong);
// };

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
  var vitri = getCartById(id);
  console.log(vitri);
  if (vitri !== -1) {
    cartList.splice(vitri, 1);
    renderCart(cartList);
    setLocalStorage();
  }
};

//localStorage
function setLocalStorage() {
  /**
   * Lưu mảng cart xuống localStorage
   * Khi lưu xuống ép sang kiểu string
   */
  localStorage.setItem("ListCart", JSON.stringify(cartList));
}

function getLocalStorage() {
  if (localStorage.getItem("ListCart")) {
    /**
     * lấy mảng empl dưới localStorage lên dùng
     * Khi lấy lên để sử dụng ép sang kiểu Json
     */
    cartList = JSON.parse(localStorage.getItem("ListCart"));

    renderCart(cartList);
  }
}

//clear cart
const clearCart = function () {
  cartList = [];
  renderCart(cartList);
};
getLocalStorage();

// function onUpdateQuantity(id, quantity) {
//   var index = getCartById(id);
//   if (index !== -1) {
//     cartList[index].quantity += quantity;
//     console.log(cartList[index].quantity);
//   } else {
//     addCart(id);
//   }
// }

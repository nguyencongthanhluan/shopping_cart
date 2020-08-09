function Validation() {
  this.checkEmpty = function (input, mess, spanId) {
    if (input.trim() === "") {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    } else {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
  };

  this.checkLength = function (input, mess, spanId, min, max) {
    if (input.length > min && input.length < max) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    }
  };

  this.checkNumber = function (input, mess, spanId) {
    var numbers = /^[0-9]+$/;

    if (input.match(numbers)) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    }
  };

  this.checkRating = function (input, mess, spanId) {
    if (input <= 5) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    }
  };

  this.checkType = function (input, mess, spanId) {
    if (input === "samsung" || input === "iphone") {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    }
  };

  this.checkTrungMa = function (input, mess, spanId, arrProduct) {
    var isValid = true;
    arrProduct.forEach(function (item) {
      if (item.id === input) {
        isValid = false;
      }
    });

    if (isValid) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    }
  };

  this.checkTrungHinh = function (input, mess, spanId, arrProduct) {
    var isValid = true;
    arrProduct.forEach(function (item) {
      if (item.image === input) {
        isValid = false;
      }
    });

    if (isValid) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    }
  };

  this.checkTrungTen = function (input, mess, spanId, arrProduct) {
    var isValid = true;
    arrProduct.forEach(function (item) {
      if (item.name === input) {
        isValid = false;
      }
    });

    if (isValid) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    } else {
      getEle(spanId).innerHTML = mess;
      getEle(spanId).style.display = "block";
      return false;
    }
  };
}

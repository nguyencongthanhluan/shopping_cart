const Product = function (
  id,
  img,
  name,
  description,
  price,
  inventory,
  rating
) {
  this.image = img;
  this.name = name;
  this.id = id;
  this.description = description;
  this.price = price;
  this.inventory = inventory;
  this.rating = rating;
};

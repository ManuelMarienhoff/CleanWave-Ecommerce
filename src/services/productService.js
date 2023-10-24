const db = require("../data/db");
const fs = require("fs");
const path = require("path");

/************* Funciones de uso local(este mismo archivo) ****************/

const formatProductPrices = function (product) {
  /* Da el formato a los precios de cada producto */

  const priceWithDiscount = // Calcula el precio final con el descuento incluido
    product.price - product.price * (product.discount / 100);

  product.priceWithDiscount = `$ ${priceWithDiscount.toLocaleString("es", {
    // Crea dentro del producto el precio con el descuento incluido y le da el formato
    minimumFractionDigits: 2,
  })}`;

  product.price = `$ ${product.price.toLocaleString("es", {
    // Le da el formato al precio
    minimumFractionDigits: 2,
  })}`;

  product.discount = product.discount.toLocaleString("es"); // Le da el formato al descuento

  return product;
};

const formatProductsPrices = function (products) {
  // Recibe los productos y a cada uno le otorga el formato
  return products.map((product) => formatProductPrices(product));
};

function deleteImage(image) {
  fs.unlinkSync(path.join(__dirname, "../../public/img/products/" + image));
}

/* Terminan funcion de uso local */

/*************** Funciones que se van a requerir en controllers *****************/
const productServices = {
  getAllProducts: () => {
    // Nos brinda todos los productos de la lista
    const products = db.products.findAll();
    return products;
  },

  getProduct: (id) => {
    // Nos brinda el producto del id especificado
    const product = db.products.findById(id);
    return product;
  },

  getFormattedProduct: (id) => {
    const product = db.products.findById(id);
    return formatProductPrices(product);
  },

  getFormattedProducts: () => {
    const products = db.products.findAll();
    return formatProductsPrices(products);
  },

  getInSaleProducts: () => {
    // Nos brinda todos los productos en oferta
    const products = db.products
      .findAll()
      .filter((product) => product.offer == true);
    return formatProductsPrices(products);
  },

  getBestSellersProducts: function () {
    const products = db.products
      .findAll()
      .filter((product) => product.bestSeller == true);

    return formatProductsPrices(products);
  },

  getRelatedProducts: function (product) {
    const categoryProduct = product.category;
    const id = product.id;
    const products = db.products
      .findAll()
      .filter(
        (product) => product.category == categoryProduct && product.id != id
      );
    return formatProductsPrices(products);
  },

  createProduct: function (dataProduct) {
    const product = {
      name: dataProduct.body.name,
      shortName: dataProduct.body.shortName,
      brand: dataProduct.body.brand,
      price: Number(dataProduct.body.price),
      discount: Number(dataProduct.body.discount),
      preferentialPrice: Number(dataProduct.body.preferentialPrice),
      mount: Number(dataProduct.body.mount),
      category: dataProduct.body.category,
      image: dataProduct.file ? dataProduct.file.filename : "defaultImg.jpg",
      description: dataProduct.body.description,
    };
    db.products.create(product);
  },

  updateProduct: function (id, product, file) {
    db.products.update(id, product, file);
  },

  deleteProduct: function (id) {
    const { image } = db.products.findById(id);
    deleteImage(image);
    db.products.delete(id);
  },
};

module.exports = productServices;

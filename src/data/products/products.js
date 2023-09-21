const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/**************** Objeto de objetos de funciones genericas ***************/
/**************** Exportado y requerido en productService.js *************/
module.exports = {
  getProducts: function () {
    // Treamons y convertimos el archivo .json en .js
    const productsFilePath = path.join(__dirname, "./productsDataBase.json");
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    return products;
  },

  saveProducts: function (products) {
    const productsFilePath = path.join(__dirname, "./productsDataBase.json");
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  },

  findAll: function () {
    // Buscar toda la lista de productos
    return this.getProducts();
  },

  findById: function (id) {
    // Buscar producto por id
    const product = this.getProducts().find((product) => product.id == id);
    return product;
  },

  create: function (product) {
    const products = this.getProducts();
    const newProduct = {
      id: uuidv4(),
      ...product,
    };
    products.push(newProduct);
    this.saveProducts(products);
  },

  update: function (id, product) {
    // Modificar un producto
    /* console.log(`Updating product ${product.name}`);
      return product; */
  },

  delete: function (id) {
    // Eliminar un producto
    /* console.log(`Deleting product with id ${id}`); */
  },
};

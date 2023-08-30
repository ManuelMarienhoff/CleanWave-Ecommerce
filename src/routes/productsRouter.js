const { Router } = require("express");
const router = Router();

const productsController = require("../controllers/productsController");

router.get("/products/productDetail", productsController.detail);
router.get("/products/productCart", productsController.cart);


module.exports = router;
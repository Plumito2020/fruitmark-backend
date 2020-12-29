const express = require("express");
const stockController = require("../controllers/stock");

const router = express.Router();

router.get("/stock", stockController.getStock);

router.post("/transfer", stockController.transferer);

router.post("/stock", stockController.create);
router.delete("/stock/:id", stockController.delete);

//Exporting the router
module.exports = router;

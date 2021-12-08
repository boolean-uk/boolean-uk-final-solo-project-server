const express = require("express");

const { getIngredientPrice } = require("./controller")

const router = express.Router();

router.get("/", getIngredientPrice)
// router.get("/", getPrice)


module.exports = router;
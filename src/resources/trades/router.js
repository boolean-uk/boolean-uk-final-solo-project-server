const express = require("express");

const router = express.Router();

const { buyAssets, getAssets } = require("./controller");

router.get("/all", getAssets);

router.post("/buy", buyAssets);

module.exports = router;

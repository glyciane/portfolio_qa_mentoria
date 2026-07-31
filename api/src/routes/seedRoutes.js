const express = require("express");
const seedController = require("../controllers/seedController");

const router = express.Router();

router.post("/seed", seedController.resetarEPopular);

module.exports = router;

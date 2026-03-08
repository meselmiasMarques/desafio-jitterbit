const express = require("express");
const controller = require("../controllers/orderController");


const router = express.Router();

router.get("/", ()=>{
    console.log("check !")
});

router.post("/order", controller.create);

module.exports = router;
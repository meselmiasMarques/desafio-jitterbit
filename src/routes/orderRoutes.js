const express = require("express");

const router = express.Router();

router.get("/", ()=>{
    console.log("testando enpoint api")
});


module.exports = router;
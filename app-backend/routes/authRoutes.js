const express = require("express"); 
var router = express.Router(); 

const AuthController = require("../controller/authController"); 

router.post("/signUp", AuthController.signUp); 
router.post("/signIn", AuthController.signIn); 

module.exports = router

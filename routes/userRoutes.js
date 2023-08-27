const express = require("express");
const router = express.Router();
const {loginUser,registerUser,currentUser}=require("../controllers/userController");
const validateToken=require("../middleware/validateTokenHandler");



router.post("/register",registerUser);
router.get("/current",validateToken, currentUser);
router.post("/login",loginUser);



module.exports = router;

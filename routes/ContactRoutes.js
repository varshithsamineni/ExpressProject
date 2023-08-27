const express=require("express");
const router=express.Router();

const {getContacts,getContact,updateContact,createContact,deleteContact}=require("../controllers/ContactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");

router.use(validateToken);
router.get("/", getContacts);
router.get("/:id", getContact);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

router.route("/:id").delete(deleteContact);




module.exports=router;

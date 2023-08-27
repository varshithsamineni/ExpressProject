const Contact=require("../models/ContactModel.js");
const asyncHandler=require("express-async-handler");

const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

const getContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);

    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    res.status(200).json(contact);
})


const createContact=asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
    if(!name||!email||!phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
  
    console.log("the request body is:",req.body);
    const contact=await Contact.create({name,email,phone,
    user_id:req.user.id});
    res.status(200).json(contact);
})

const updateContact=asyncHandler(async(req,res)=>{

    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts");
    }
    

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true});
    res.status(200).json(updatedContact);
}
)

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user contacts");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
    
})

module.exports={getContacts,getContact,updateContact,createContact,deleteContact};
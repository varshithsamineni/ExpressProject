const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
const User=require("../models/userModel.js");

const registerUser=asyncHandler(async (req, res) => {
    const {username,email,password}=req.body;
    if(!username||!password||!email)
    {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    
    const userAvailable=await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("The User had already registered");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("hashed password:",hashedPassword);

    const newUser=await User.create({username,password:hashedPassword,email});
    console.log(`user registered sucessfully ${newUser}`);

    if(newUser)
    {
   res.status(201).json({_id:newUser.id,email:newUser.email});
    }
    else
    {    res.status(400);
    throw new Error("User data is Not Valid");
    }
  });


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("All the Fields are mandatory");
    }
  
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );
  
      res.status(200).json({ accessToken });
    }
     else {
      res.status(401);
      throw new Error("Email or password is not valid");
    }
  });
  

const currentUser=asyncHandler(async (req, res) => {
    res.json({ "message": "user in the current route" });
  });  
  
module.exports={registerUser,loginUser,currentUser};  
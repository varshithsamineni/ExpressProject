const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the user name"]
    },
    email:{
        type:String,
        required:[true,"please add the email address"],
        unique:[true,"This email address is already taken"]
    },
    password:{
        type:String,
        required:[true,"please add the password"]
    }
},
{
    timestamps:true,
}
   
);
module.exports=mongoose.model("User",userSchema);
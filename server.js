const express=require("express");
const dotenv=require("dotenv").config();
const connectDb=require("./config/dbConnection");
const app=express();

const port=process.env.PORT||5000;
app.use(express.json());
connectDb();
app.use("/api/contacts", require("./routes/ContactRoutes.js"));
app.use("/api/users",require("./routes/userRoutes.js"));



app.listen(port,()=>{
    console.log(`connected to the port ${port}`);
})
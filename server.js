var express=require("express");
var path=require("path");
var nodemailer=require("nodemailer");

var app=express();
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    var fullpath=path.join(__dirname,"/public/index.html");
    res.sendFile(fullpath);
});

var userRouter=require("./routers/userrouter");
app.use("/user",userRouter);

app.listen(8084,()=>{
    console.log("connnnnnneeeeeeeeeeeecccctttttttttteeeeeeeeeedddddddddd");
});
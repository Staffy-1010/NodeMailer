var express=require("express");
var path=require("path");
var nodemailer=require("nodemailer");
var mysql=require("mysql");
var config={
    host:"localhost",
    user:"root",
    password:"",
    database:"nodemailer"
}
var dbcon=mysql.createConnection(config)
var app=express();
app.use(express.static("public"));
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    auth: {
      user: 'staffynodemailer@gmail.com', 
      pass: '*********' 
    },
  });
app.post("/sendmail",(req,res)=>{
    var {too,sub,msg}=req.body;
    var info =transporter.sendMail({
        from: 'staffynodemailer@gmail.com',
        to: too,
        subject: sub,
        text: msg ,
      });
    dbcon.query("insert into mails values(?,?,?,CURRENT_DATE(),CURRENT_TIME())",[too,sub,msg],(err,result)=>{
        if(err)
        res.end(err.message);
        else{
        var fullPath=path.join(__dirname,"..","public","index.html");
        res.sendFile(fullPath);
        }
    })
  })
  app.post("/all",(req,res)=>{
    var {too,sub,msg}=req.body;
    dbcon.query("insert into mails values(?,?,?,CURRENT_DATE(),CURRENT_TIME())",[too,sub,msg]);
    dbcon.query("select * from mails",(err,result)=>{
        if(err)
        res.end(err.message);
        else{
        var arr=result;
        arr.forEach(x => {
          console.log(x.too);
          transporter.sendMail({
              from: 'staffynodemailer@gmail.com',
              to: x.too,
              subject: sub,
              text: msg ,
            })
        });
        var fullPath=path.join(__dirname,"..","public","index.html");
        res.sendFile(fullPath);
        }
    })
  })
app.get("/mails",(req,res)=>{
      dbcon.query("select * from mails",(err,result)=>{
          if(err)
          res.end(err.message);
          else
          res.send(result);
      })
  })
module.exports=app;

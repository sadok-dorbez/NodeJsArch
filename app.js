const express=require('express');
const http=require('http');
const mongo=require('mongoose');
const mongoconnection=require('./config/mongoconnection.json');

mongo.connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

var app=express();
const UserRouter=require ("./routes/user");
app.use("/user", UserRouter);
const server=http.createServer(app);
server.listen(3000,()=>console.log("server is running "));
const express=require('express');
const http=require('http');

var app=express();
const UserRouter=require ("./routes/user");
app.use("/user", UserRouter);
const server=http.createServer(app);
server.listen(3000,()=>console.log("server is running "));
const express=require('express');
const router=express.Router();

router.get('/show',(req,res,next)=>{
    res.send('Hello Sadok');
});

module.exports=router;
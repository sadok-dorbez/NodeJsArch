const { urlencoded } = require('body-parser');
const express=require('express');
var router=express.Router();
const User=require('../modele/user')

router.get('/show',(req,res,next)=>{
    res.send('You are welcome');
    
});/*
////////////////////////////////// Post By parameters
router.get('/add/:name/:email/:cin',(req,res,next)=>{
    console.log("notre data :"+JSON.stringify(req.params));
    new user({
        name:req.params.name,
        email:req.params.email,
        cin:req.params.cin
    }).save((err,data)=>{
        if(err){
            console.log(err);
        }
        console.log(data);
        res.json(data);

    });
});
*/
router.post("/add", async function(req,res,next){
    console.log("resultat:"+req.body);
    try{

        const user = new User({...req.body});
        await user.save();
        res.status(201).send("heyy");
    } catch(err){
        console.log(err);
    }

});

///////////////////////////////////////// Post By Json BodyRequest

router.post("/new",(req,res,next)=>{
   // console.log("resultat:"+req.body);
    try{

        const User=new user(req.body);
        User.save();
        //res.json(req.body);
        res.send("added successfully");
    } catch(err){
        console.log(err);
    }
   

});

/////////////////////////////////////// Get all list
router.get('/getAll', async (req, res) => {
    try{
        const data = await user.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



router.get("/getByCin/:cin",async(req,res,next)=>{
    
    
    try{
        tab=[];
        const c=req.params.cin;
        const data = await user.find();
        if (c < 0){
            throw new Error ("cin must be positive");
          }
          tab.push(data[c]);

    }catch(error){
        res.status(500).json({message:error.message})
    }
    return res.json(tab);
})


 
module.exports=router;
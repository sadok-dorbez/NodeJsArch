const { urlencoded } = require('body-parser');
const express=require('express');
var router=express.Router();
const user=require('../modele/user')

router.get('/show',(req,res,next)=>{
    res.send('You are welcome');
    
});
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

router.put("/update/:id",async function(req,res){
    try{
        await user.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send("updated successfully");

    }catch(err){
        res.send(err)
    }
})


router.delete("/delete/:id",async function(req,res){
    try{
        await user.findByIdAndRemove(req.params.id);
        res.send("deleted successfully");

    }catch(err){
        res.send(err)
    }
})





/*router.post("/add", async function(req,res,next){
    console.log("resultat:"+req.body);
    try{

        const User=new user(...req.body);
        await User.save();
    } catch(err){
        console.log(err);
    }
   

});*/

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
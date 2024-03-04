const express = require('express');
const router = express.Router();
const userModule = require('../modals/userSchema');


router.route("/registration").post(async(req,res)=>{
    const {username,password} = req.body;
    if(!username||!password){
      res.status(400).json({Alert:"You have not provided correct details"})
    }
    try{
      const response = await userModule.create({username:username,password:password})

      if(!response){
        res.status(400).json({Alert:"Data have not successfully provided"});
      }
      return res.status(200).json({Alert:"Data have stored successfully in to the dayabase ! "});

    }catch(err){
      console.log(err);
    }
})

router.route("/login").post(async(req,res)=>{
  const {username,password} = req.body;

  if(!username||!password){
    res.status(400).json({Alert:"You have not provided correct details"})
  }
  try{
    const response = await userModule.findOne({username:username,password:password});
   if(! response){
      return  res.status(400).json({Alert:"No user found !"})
    }
    return res.status(200).json({Alert:"Data have stored successfully in to the dayabase ! "});
  }catch(err){
    console.log(err);
  }
})



module.exports = router;
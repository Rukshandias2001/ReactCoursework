const express = require('express');
const router = express.Router();
const userModule = require('../modals/userSchema');

async function dropIndexIfNeeded() {
  try {
    await userModule.collection.dropIndex('id_1');
    console.log('Index id_1 dropped successfully.');
  } catch (err) {
    if (err.code === 27) { // Error code for "index not found"
      console.log('Index id_1 not found, no need to drop.');
    } else {
      console.error('Error dropping index id_1:', err);
    }
  }
}


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
    return res.status(200).send(response);
  }catch(err){
    console.log(err);
  }
})

router.route('/updateUser').patch(async(req, res) => {
  const { username, password, favorites,pictures } = req.body;
  
  
  favorites.pictures= pictures;
  
  
  if (!username || !password) {
    console.log("Bad credentatials");
  
    return res.status(400).json({Alert: "You have not provided correct details"});
  }
  
  try {
    // Find the user by username and password (though using password directly like this isn't recommended for security reasons)
    const user = await userModule.findOne({ username: req.body.username, password:req.body.password });
    

    if (!user) {
      return res.status(404).json({Alert: "No user found"});
    }
    
    
    // Add the new favorite property to the user's favorites
   
    user.favorites.push(favorites);
    

    // Save the updated user document
    await user.save();

    return res.status(200).json({Alert: "Your favorites have been successfully updated in the database!"});

  } catch (err) {
    console.log(err);
    return res.status(500).json({Alert: "An error occurred while updating your favorites."});
  }
});

router.route('/displayFavourites').post(async(req,res)=>{
  const {username,password} = req.body;
  try{
    const response = await userModule.findOne({username:username,password:password});
   
    if(!response){
      return res.status(400).json({Alert: "You have not provided correct details"});
    }
    return res.send(response);
  }catch(err){
    console.log(err);
  }
})





module.exports = router;



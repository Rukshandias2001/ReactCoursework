const express = require('express');
const router = express.Router();
const userModule = require('../modals/userSchema');


router.route('/delete').post(async(req,res)=>{
  const {id,username,password} = req.body;
  try{
    const result = await userModule.updateOne(
      { username: username, password: password }, // In real applications, consider using hashed passwords and authentication tokens instead
      { $pull: { favorites: { id: id } } } // Correct use of $pull to remove a specific item by its id
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("No item found with the given ID or user not found.");
    }
    res.status(200).send("Item has been deleted successfully.");

  }catch(err){
    console.log(err);
    res.status(500).send("Error deleting the item.");
  }
})

module.exports = router;
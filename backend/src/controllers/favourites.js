const express = require('express');
const router = express.Router();
const listofId = require('../modals/idSchema');

async function dropIndexIfNeeded() {
  try {
    await listofId.collection.dropIndex('id_1');
    console.log('Index id_1 dropped successfully.');
  } catch (err) {
    if (err.code === 27) { // Error code for "index not found"
      console.log('Index id_1 not found, no need to drop.');
    } else {
      console.error('Error dropping index id_1:', err);
    }
  }
}

// You might call dropIndexIfNeeded() at application startup
// dropIndexIfNeeded(); // Uncomment to use

router.route('/favourites').post(async (req, res) => {
  try {
    const { details, added, pictures } = req.body;
    if (!req.body) {
      return res.status(400).json({ Alert: "Nothing has added here !" });
    }
    
    const response = await listofId.create({ details, added, pictures });
    dropIndexIfNeeded();
    if (!response) {
      return res.status(400).json({ Alert: "Property has not saved to the database !" });
    }
    // Use res.status(200).json(...) to send a response
    return res.status(200).json({ message: "You have Successfully added the item" });
  } catch (err) {
    console.error(err); // Log the error
    return res.status(400).json({ Alert: "Property has not saved to the database !" });
  }
});


router.route('/getFavourite').get(async(req,res)=>{
  try{
    const response = await listofId.find();
    if(!response){
      return res.status(400).json({Alert:"Property has not saved to the database !"});
    }
    return res.send(response);
  }catch(err){
    console.log("The error is : "+err);
  }
});

router.route('/delete').post(async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    if (!id) {
      return res.status(400).json({ Alert: "bad request!" }); // Correctly using return here
    }
    const response = await listofId.deleteOne({ "details.id": id });
    if (response.deletedCount === 0) { // Corrected the condition to === 0
      return res.status(400).send("The id has not been deleted properly");
    }
    return res.status(200).send("The item has been deleted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message); // Handle any other errors
  }
});


module.exports = router;



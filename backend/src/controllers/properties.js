const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const listOfProperties = require('../modals/propertiesSchema');

router.route('/post').post(async (req, res) => {
  const { details, added, pictures } = req.body;
  if (!req.body) {
    return res.status(400).json({ Alert: "Nothing has added here !" });
  }
  try {
    // Upload pictures to Cloudinary
    const uploadedPicture = await cloudinary.uploader.upload(pictures.picture);
    const uploadedPicture2 = await cloudinary.uploader.upload(pictures.picture2);
    const uploadedPicture3 = await cloudinary.uploader.upload(pictures.picture3);
    
    // Construct a new object with the URLs returned from Cloudinary
    const uploadedPictures = {
      picture: uploadedPicture.url,
      picture2: uploadedPicture2.url,
      picture3: uploadedPicture3.url
    };

    // Create a new property with the uploaded picture URLs
    const data = await listOfProperties.create({ details, added, pictures: uploadedPictures });

    if (!data) {
      return res.status(400).json({ Alert: "data has not been stored to database" });
    }
    return res.status(200).json({ Alert: "data has been stored to database" });
  } catch (err) {
    console.log("there is an error " + err);
    return res.status(500).json({ Alert: "An error occurred while processing your request." });
  }
});


router.route('/get').get(async(req,res)=>{
  try{
    const data = await listOfProperties.find();
    if(!data){
      return res.status(400).send("No data !")
    }
    return res.send(data);
  

  }catch(err){
    console.log("the error is" + err);
  }

});
router.route('/id').post(async(req,res)=>{
  const{id} = req.body;
  console.log(id);

  try{
    const data = await listOfProperties.findOne({'details.id':id});

    console.log(data);

    return res.status(200).send(data);

  }catch(err){
    console.log(err);
  }
})



module.exports = router;

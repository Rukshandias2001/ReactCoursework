const express = require('express');
const router = express.Router();
const houseUploader = require('../controllers/properties');
const favouriteHandler = require('../controllers/favourites');

router.use('/details',houseUploader);
router.use('/favourites',favouriteHandler);
module.exports = router;
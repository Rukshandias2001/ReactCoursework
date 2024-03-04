const express = require('express');
const router = express.Router();
const houseUploader = require('../controllers/properties');
const favouriteHandler = require('../controllers/favourites');
const registration = require('../controllers/registration');


router.use('/details',houseUploader);
router.use('/favourites',favouriteHandler);
router.use('/register',registration);

module.exports = router;
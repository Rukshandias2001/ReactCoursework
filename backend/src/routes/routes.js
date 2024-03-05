const express = require('express');
const router = express.Router();
const houseUploader = require('../controllers/properties');
const favouriteHandler = require('../controllers/favourites');
const registration = require('../controllers/registration');
const del = require('../controllers/delete');


router.use('/details',houseUploader);
router.use('/favourites',favouriteHandler);
router.use('/register',registration);
router.use('/delete',del);

module.exports = router;
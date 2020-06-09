// main router
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
// get request to call homeController
router.get('/',homeController.home);
// show to use the users router
router.use('/users',require('./users'));
console.log("router created");
module.exports = router;
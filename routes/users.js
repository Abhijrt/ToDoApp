const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
router.post('/create',userController.create);
router.get('/deleteEntry',userController.destroy);
module.exports = router;
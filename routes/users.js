const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
// call userController's control method according to the method calling
router.post('/create',userController.create);
router.get('/deleteEntry',userController.destroy);
module.exports = router;
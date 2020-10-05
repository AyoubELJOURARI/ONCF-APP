const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

//router.use(authController.isloggedIn);

router.get('/', authController.isloggedIn, viewsController.getWelcome);

router.get('/contracts', authController.protect, viewsController.getOverview);

router.get(
  '/contract/:id',
  authController.protect,
  viewsController.getContract
);

router.get('/login', viewsController.getLoginForm);

router.get('/me', authController.protect, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);
module.exports = router;

const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//where we want to save our image

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgetPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all route after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get(
  '/me',

  userController.getMe,
  userController.getUser
);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

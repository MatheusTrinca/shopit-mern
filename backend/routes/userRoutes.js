const express = require('express');
const {
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// Admin Routes
router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails);

router
  .route('/admin/user/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser);

router
  .route('/admin/user/:id')
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;

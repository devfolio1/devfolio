const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  Forgotpassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  updateUserRole,
  deleteUser,
  getSingleUser,
  getAllUser
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/password/forgot").post(Forgotpassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/updateProfile").put(isAuthenticatedUser, updatePassword);
router.route("/me/updateProfile").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser,  authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser,  authorizeRoles("admin"),  updateUserRole)
  .delete(isAuthenticatedUser,  authorizeRoles("admin"),  deleteUser);
router.route("/logout").get(logout);

module.exports = router;

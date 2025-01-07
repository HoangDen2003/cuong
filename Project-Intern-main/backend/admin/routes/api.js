require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
const router = express.Router({ mergeParams: true });
const authController = require("modules/auth/controllers/authController");
const authValidation = require("modules/auth/validations/authValidation");
const userController = require("modules/user/controllers/userController");
const userValidation = require("modules/user/validations/userValidation");
const categoryController = require("modules/category/controllers/categoryController");
const categoryValidation = require("modules/category/validations/categoryValidation");
const languageController = require("modules/language/controllers/languageController");
const languageValidation = require("modules/language/validations/languageValidation");
const { auth, admin, user } = require("middlewares/authVerify");
const { uploads } = require("middlewares/multer");

// router.group("/posts",middlewares([authenticated, role("owner")]), validate([]),(router) => {
//     router.post("/create",validate([createPostRequest]),postsController.create);
//     router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//     router.delete("/delete/:postId", postsController.destroy);
//   }
// );

// router.group('/sample', (router) => {
//   router.get('/', sampleController.index),
//   router.post('/with-validation', validate([sampleValidation.index]), sampleController.validate)
// })

router.group("/auth", (router) => {
  router.delete("/delete-otp", authController.deleteOtp);
  // router.post("/sign-up", authController.register);
  router.post(
    "/sign-in",
    validate([authValidation.index]),
    authController.login
  );
  router.post(
    "/forgot-password",
    validate([authValidation.checkEmail]),
    authController.forgotPassword
  );
  // send email
  router.post("/send-email", authController.sendMail);
  router.post(
    "/verify-email",
    validate([authValidation.checkOTP]),
    authController.verifyEmail
  );
  router.put("/newpassword", authController.newPassword);
});

router.group("/users", (router) => {
  router.get("/get-user", userController.getUser);
  router.delete(
    "/delete",
    validate([userValidation.delete]),
    userController.deleteUser
  );
  router.put(
    "/update/:id",
    uploads.single("avatar"),
    validate([userValidation.update]),
    userController.updateUser
  );
  router.post(
    "/create",
    uploads.single("avatar"),
    validate([userValidation.create]),
    userController.createUser
  );
  router.get("/", userController.index);
  // localhost:3000/users/search?search=
});

router.group("/categories", admin, (router) => {
  router.delete(
    "/delete",
    validate([categoryValidation.delete]),
    categoryController.deleteCategory
  );
  router.put(
    "/update/:id",
    validate([categoryValidation.update]),
    categoryController.updateCategory
  );
  router.post(
    "/create",
    validate([categoryValidation.create]),
    categoryController.createCategory
  );
  router.get("/", categoryController.index);
});

router.group("/languages", admin, (router) => {
  router.delete(
    "/delete",
    validate([languageValidation.delete]),
    languageController.deleteLanguage
  );
  router.put(
    "/update/:id",
    uploads.single("flag"),
    validate([languageValidation.update]),
    languageController.updateLanguage
  );
  router.post(
    "/create",
    uploads.single("flag"),
    validate([languageValidation.create]),
    languageController.createLanguage
  );
  router.get("/", languageController.index);
});

module.exports = router;

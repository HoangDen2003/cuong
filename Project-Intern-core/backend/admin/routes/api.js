require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
const router = express.Router({ mergeParams: true });

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

// TODO: Có thể tham khảo cách viết router như sau:
// router.group("/auth", (router) => {
//   router.delete("/delete-otp", authController.deleteOtp);
//   // router.post("/sign-up", authController.register);
//   router.post(
//     "/sign-in",
//     validate([authValidation.index]),
//     authController.login
//   );
//   router.post(
//     "/forgot-password",
//     validate([authValidation.checkEmail]),
//     authController.forgotPassword
//   );
//   // send email
//   router.post("/send-email", authController.sendMail);
//   router.post(
//     "/verify-email",
//     validate([authValidation.checkOTP]),
//     authController.verifyEmail
//   );
//   router.put("/newpassword", authController.newPassword);
// });

module.exports = router;

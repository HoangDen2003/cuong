require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
const sampleController = require("modules/sample/controllers/sampleController");
const sampleValidation = require("modules/sample/validations/sampleValidation");
const postController = require("modules/owner/post/controllers/postController");
const postValidation = require("modules/owner/post/validations/postValidation");
const authController = require("modules/owner/auth/controllers/authController");
const authValidation = require("modules/owner/auth/validations/authValidation");
const authenticateToken = require("kernels/middlewares/authenticateToken");
const siteController = require("modules/owner/site/controllers/siteController");
const router = express.Router({ mergeParams: true });

// router.group("/posts",middlewares([authenticated, role("owner")]), validate([]),(router) => {
//     router.post("/create",validate([createPostRequest]),postsController.create);
//     router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//     router.delete("/delete/:postId", postsController.destroy);
//   }
// );

// API post routes
router.group('/post', (router) => {
  router.use(authenticateToken);
  router.get('/user/:uid', validate([postValidation.getByUid]), postController.getByUid),     //API get post
  router.get('/:id', validate([postValidation.getById]), postController.getById),   //API get detail post
  router.post('/create', validate([postValidation.create]), postController.create),    //API create post
  router.put('/update/:id', validate([postValidation.update]), postController.update),    //API update post
  router.delete('/delete', validate([postValidation.delete]), postController.delete),    //API delete post 
  router.patch('/update-multiple', validate([postValidation.updateMultiple]), postController.updateMultiple)    //API update-multiple post
});

// API site routes
router.group('/user', (router) => {
  router.use(authenticateToken);
  router.get('/:uid', siteController.getUserById),
  router.put('/update/:uid', siteController.updateUser)
});

// API site routes
router.get('/category', siteController.getCategory); //API get category
router.get('/language', siteController.getLanguage); //API get language
router.get('/index', validate([postValidation.index]), postController.index);     //API get post
router.get('/:id', validate([postValidation.getById]), postController.getById);   //API get detail post
router.get('/category/:id', validate([postValidation.getCategory]), postController.getCategory);   //API get post by category

// API auth routes
router.group('/auth',(router) => {
  router.post('/sign-in',validate([authValidation.signIn]), authController.signIn),   //login
  router.post('/sign-up',validate([authValidation.signUp]), authController.signUp),   //register
  router.put('/reset-password',validate([authValidation.resPass]), authController.resPass),    //reset password
  router.post('/forgot-password',validate([authValidation.forgotPassword]), authController.forgotPassword)
  router.post('/check-otp-mail',validate([authValidation.checkOtpMail]), authController.checkOtpMail)
})

router.group('/sample', (router) => {
  router.get('/', sampleController.index),
  router.post('/with-validation', validate([sampleValidation.index]), sampleController.validate)
})


module.exports = router;

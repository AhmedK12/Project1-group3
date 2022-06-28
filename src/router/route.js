const express= require("express");
const router= express.Router();
const authorController = require("../Controllers/authorController");
const blogController= require("../Controllers/blogcontroller");
const authentication= require("../middleware/authentication");
const authorisation= require("../middleware/authorisation");


router.post("/authors", authorController.createAuthor);
router.post("/login", authorController.authorLogin);
router.post("/blogs", authentication.authenticate, blogController.createBlog);
router.get("/blogs", authentication.authenticate, blogController.getBlog);
router.put("/blogs/:blogId", authentication.authenticate, authorisation.authorised, blogController.updateBlog);
router.delete("/blogs/:blogId", authentication.authenticate, authorisation.authorised, blogController.blogDeleteById);
router.delete("/blogDeleteByQuery",authentication.authenticate, authorisation.authorise, blogController.blogDeleteByQuery);
module.exports = router;










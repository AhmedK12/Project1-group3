const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");
const blogController = require("../Controllers/blogcontroller");
const authentication = require('../middleware/authentication')
const authorMiddleware = require('../middleware/authorMiddleware')
const blogMiddleware = require("../middleware/blogMiddleware")










router.post("/authors",authorMiddleware.validateRequest, authorController.createAuthor);
router.post("/login",authorMiddleware.validateloginrequest, authorController.authorLogin)
router.post("/blogs", authentication.authenticate,blogMiddleware.validateCreateBlogRequest, blogController.createBlogDoc);
router.get("/blogs",authentication.authenticate,blogMiddleware.vlidateBlogGetRequest, blogController.blogs)
router.put("/blogPut/:blogId",authentication.authenticate, blogMiddleware.validatePutRequest, blogController.blogPut);
router.delete("/blogDel/:blogId",authentication.authenticate, blogMiddleware.validateDeleteByBlogIdRequest, blogController.blogDeletById)
router.delete("/blogDelByQuery",authentication.authenticate, blogMiddleware.validateDeleteByQueryParams,blogController.blogDeletByParams)







module.exports = router;

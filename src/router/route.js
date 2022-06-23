const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");
const blogController = require("../Controllers/blogcontroller");
const validatePutRequest = require("../middleware/putMiddleware")
const validateDeleteRequestById = require("../middleware/deletMiddleware")



router.post("/authors", authorController.createAuthor);
router.post("/login",authorController.authorLogin)
router.post("/blogs", blogController.createBlogDoc);
router.get("/blogs",blogController.blogs)
router.put("/blogPut/:blogId",validatePutRequest.validatePutRequest, blogController.blogPut);
router.delete("/blogDel/:blogId",validateDeleteRequestById.validateDeleteByBlogIdRequest, blogController.blogDeletById)
router.delete("/blogDelByQuery",validateDeleteRequestById.validateDeleteByQueryParams,blogController.blogDeletByParams)

module.exports = router;

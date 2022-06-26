const express = require("express");
const router = express.Router();
const authorController = require("../Controllers/authorController");
const blogController = require("../Controllers/blogcontroller");
const validatePutRequest = require("../middleware/putMiddleware")
const validateDeleteRequestById = require("../middleware/deletMiddleware")
const authMw=require("../middleware/authentication")
const MwAuth=require("../middleware/authorisation")
// ///////////////////////////////////////////////////

router.post("/authors", authorController.createAuthor);
router.post("/login",authorController.authorLogin)
router.post("/blogs",authMw.authenticate,blogController.createBlogDoc);
router.get("/blogs",authMw.authenticate,blogController.blogs)
router.put("/blogPut/:blogId",validatePutRequest.validatePutRequest,authMw.authenticate,MwAuth.authorised ,blogController.blogPut);
router.delete("/blogDel/:blogId",validateDeleteRequestById.validateDeleteByBlogIdRequest,blogController.blogDeletById)
router.delete("/blogDelByQuery",authMw.authenticate,blogController.blogDeletByParams)
module.exports = router;

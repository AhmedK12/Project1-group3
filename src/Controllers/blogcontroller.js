const blogModel = require("../Models/blogModel")
const moment = require('moment')
const lodash = require('lodash')
const mongoose = require("mongoose")
const authorModel = require('../Models/authorModel')
const { filter, update } = require("lodash")
const ObjectId = mongoose.Types.ObjectId;


/*####################################################### POST API ####################################################*/




const createBlogDoc = async function (req, res) {
    try {
        let blogData = {}
        blogData.body = req.body.body
        blogData.title = req.body.title
        blogData.category = req.body.category
        blogData.authorId = req.body.authorId
        if(req.body.tags) blogData.tags = req.body.tags
        if(!req.body.isPublished || req.body.isPublished ===true)blogData.publishedAt = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");
        if(req.body.subCategory) blogData.subCategory = req.body.subCategory
        let authorId= blogData.authorId
        let authorDetails= await authorModel.findById(authorId)
        if(!authorDetails) return res.status(404).send({status:false,msg:"No author exist with this authorId"})
        let savedblogData = await blogModel.create(blogData)
        res.status(201).send({ msg: savedblogData })
        }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}










/*############################################################## GET API #######################################*/



const blogs = async (req, res) => {
    try {
    let blogfilter = {}
    blogfilter.isDeleted = false
    blogfilter.isPublished = true
    if(req.query.authorId) blogfilter.authorId = req.query.authorId
    if(req.query.tags) blogfilter.tags = {"$in":req.query.tags}
    if(req.query.subCategory) blogfilter.subCategory = {"$in":req.query.subCategory}
    if(req.query.category)blogfilter.category = req.query.category
    console.log(blogfilter)
    let blogs = await blogModel.find(blogfilter)
    if (Object.keys(blogs).length === 0) return res.status(404).send({ status: false, msg: "Data not Found" })
    return res.status(200).send({ status: true, data: blogs })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}







/*##################################################### PUT API ##################################################*/






const blogPut = async (req, res) => {


    try {
        let blog = {};
        if(req.body.title) blog.title = req.body.title
        if(req.body.body) blog.body = req.body.body
        blog.blogId = req.params.blogId
        blogToBeUpdted = req.headers.blogToBeUpdted
        blog.tags = lodash.uniq(blogToBeUpdted.tags.concat(req.body.tags||[]));
        blog.subCategory = lodash.uniq(blogToBeUpdted.subCategory.concat(req.body.subCategory||[])); 
        blog.isPublished = true
        blog.publishedAt = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");
        let blogUpdated = await blogModel.findOneAndUpdate({ _id: blog.blogId }, blog, { new: true, upsert: true, strict: false })
        if (Object.keys(blogUpdated).length===0) return res.status(404).send({ status: false, msg: "Blog does not exist" })
        return res.status(201).send({ status: true, data: blogUpdated })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}




const blogPut2 = async (req, res) => {
    try {
        update.isPublished = true;
        update.authorId = req.headers.authorId;

        let blog = req.body;
        blog.blogId = req.params.blogId
        blogToBeUpdted = req.headers.blogToBeUpdted
        blog["tags"] = lodash.uniq(blogToBeUpdted.tags.concat(req.body.tags||[]));
        blog["subCategory"] = lodash.uniq(blogToBeUpdted.subCategory.concat(req.body.subCategory||[])); 
        blog["isPublished"] = true
        blog["publishedAt"] = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");
        let blogUpdated = await blogModel.findOneAndUpdate({ _id: blog.blogId }, blog, { new: true, upsert: true, strict: false })
        if (Object.keys(blogUpdated).length===0) return res.status(404).send({ status: false, msg: "Blog does not exist" })
        return res.status(201).send({ status: true, data: blogUpdated })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}



















const blogPut1 = async (req, res) => {
    try {
        let blog = req.body;
        if (Object.keys(blog).length===0) return res.status(400).send({ status: false, msg: "Bad Request" });
        let blogToBeUpdted = await blogModel.findOne({ _id: req.params.blogId, isDeleted: false })
        if (Object.keys(blogToBeUpdted).length===0) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
        blog.isPublished = true
        blog.publishedAt = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");
        blog.$addToSet = {subCategory: {"$each":blog.subCategory},tags: {"$each":blog.tags}}
        delete blog.subCategory
        delete blog.tags
        let blogUpdated = await blogModel.findOneAndUpdate({ _id: req.params.blogId }, blog, { new: true, upsert: true, strict: false })
        if (!blogUpdated) return res.status(404).send({ status: false, msg: "Use Not Exist" })
        return res.status(201).send({ status: true, data: blogUpdated })
        } catch (error) {
                res.status(500).send({ status: false, msg: error.message })
          }

}




/*############################################# DELETE APIS ################################################*/


const blogDeletById = async (req, res) => {
    try {
    await blogModel.findOneAndUpdate({ _id: req.params.blogId }, { isDeleted: true,deletedAt : moment().format("YYYY MM DDThh:mm:ss.SSS[Z]")})
    res.status(200).send()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const blogDeletByParams = async (req, res) => {    
    
    try {
    let filter = {}
    filter.authorId = req.headers.authorId
    if(req.query.category) filter.category = req.query.category
    if(req.query.tags) filter.tags = req.query.tags
    if(req.query.subCategory) filter.subCategory = req.query.subCategory
    if(req.query.isPublished && req.query.isPublished==='flase') filter.isPublished = false
    let blogToBeDeleted = await blogModel.find(filter)
    if (Object.keys(blogToBeDeleted).length===0) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
    for(let i=0;i<blogToBeDeleted.length;i++){
    await blogModel.findOneAndUpdate( {_id:blogDeletById.blogId}, {$set:{isDeleted:true,deletedAt:moment().format("YYYY MM DDThh:mm:ss.SSS[Z]")}},{ new: true, upsert: true, strict: false })
    res.status(200).send()
    }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

    
    
}






module.exports.blogs = blogs
module.exports.createBlogDoc = createBlogDoc
module.exports.blogPut = blogPut
module.exports.blogDeletById = blogDeletById
module.exports.blogDeletByParams = blogDeletByParams
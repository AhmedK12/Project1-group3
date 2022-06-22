const blogModel = require("../Models/blogModel")
const moment = require('moment')
const lodash = require('lodash')
const mongoose = require("mongoose")
const authorModel = require('../Models/authorModel')



/*####################################################### POST API ####################################################*/




const createBlogDoc = async function (req, res) {
    try {
        let blogData = req.body
          console.log(blogData)
        if (Object.keys(blogData).length !== 0) {   
            let authorId= blogData.authorId
            let authorDetails= await authorModel.findById(authorId)
            console.log(authorDetails)
            if(!authorDetails) return res.status(404).send({msg:"No author exist with this authorId"})
            let savedblogData = await blogModel.create(blogData)
            res.status(201).send({ msg: savedblogData })
        }
         else {res.status(400).send({ msg: "BAD REQUEST" })}
  
}
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}












const createBlogDoc1 = async function (req, res) {
    try {
        let blogData = req.body
        if (Object.keys(blogData).length != 0) {
            let authorId = blogData.authorId;
            auther = await authorModel.findById(authorId)
        
            let savedblogData = await blogModel.create(blogData)
            res.status(201).send({ msg: savedblogData })
        }
        else res.status(400).send({ msg: "BAD REQUEST" })
    }

    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

/*############################################################## GET API #######################################*/

const blogs = async (req, res) => {

    try {
    req.query["isDeleted"] = false
    req.query["isPublished"] = true 
    if(req.query.tags)
    req.query.tags = {"$all":req.query.tags.split(",")}
    if(req.query.subCategory)
    req.query.subCategory = {"$all":req.query.subCategory.split(",")}
    let blogs = await blogModel.find(req.query)
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
        let blog = req.body;
        if (Object.keys(blog).length===0) return res.status(400).send({ status: false, msg: "Bad Request" });
        let blogId = req.params.blogId;
        let blogToBeUpdted = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (Object.keys(blogToBeUpdted).length===0) return res.status(404).send({ status: false, msg: "Blog does not exist" });
        blog["tags"] = lodash.uniq(req.body.tags.concat(blogToBeUpdted.tags));
        blog["subCategory"] = lodash.uniq(req.body.subCategory.concat(blogToBeUpdted.subCategory));
        blog["isPublished"] = true
        blog["publishedAt"] = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");

        let blogUpdated = await blogModel.findOneAndUpdate({ _id: blogId }, blog, { new: true, upsert: true, strict: false })

        if (Object.keys(blogUpdated).length===0) {
            return res.status(404).send({ status: false, msg: "Blog does not exist" })
        }

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


// find({},{},{})


/*############################################# DELETE APIS ################################################*/


const blogDeletById = async (req, res) => {
    try {
    if (!req.params.blogId) return res.status(400).send({ status: false, msg: "Bad Request" });
    let blogToBeDeleted = await blogModel.findOne({ _id: req.params.blogId, isDeleted: false })
    if (!blogToBeDeleted) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
    await blogModel.findOneAndUpdate({ _id: req.params.blogId }, { isDeleted: true })
    res.status(200).send()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const blogDeletByParams = async (req, res) => {
    
    try {
        if (!req.query) return res.status(400).send({ status: false, msg: "Bad Request" });
    let blogToBeDeleted = await blogModel.find(req.query)
    if (Object.keys(blogToBeDeleted).length===0) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
    for(let i=0;i<blogToBeDeleted.length;i++){
    let temp = JSON.parse(JSON.stringify(blogToBeDeleted[i]));
    temp["deletedAt"] = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");
    temp.isDeleted = true
    let id = mongoose.Types.ObjectId(temp["_id"])
    await blogModel.findOneAndUpdate( {_id:id}, temp,{ new: true, upsert: true, strict: false })
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
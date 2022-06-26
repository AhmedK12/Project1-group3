const blogModel = require("../Models/blogModel")
const moment = require('moment')
const lodash = require('lodash')
const mongoose = require("mongoose")
const authorModel = require('../Models/authorModel')

// /*####################################################### POST API ####################################################*///////
const createBlogDoc = async function (req, res) {
    try {
        let blogData = req.body
        if (Object.keys(blogData).length !== 0) {   
            let authorId= blogData.authorId
            let authorDetails= await authorModel.findById(authorId)
            if(!authorDetails) return res.status(404).send({msg:"No author exist with this authorId"})
            let savedblogData = await blogModel.create(blogData)
            res.status(201).send({ msg: savedblogData })
        }
         else {res.status(400).send({ msg: "BAD REQUEST" })}
}
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


/*############################################################## GET API #######################################*/

const blogs = async (req, res) => {

    try {
        let blogfilter={}
        blogfilter.isDeleted=false
        blogfilter.isPublished=true
     
    if(req.query.tags)
    blogfilter.tags = {"$all":req.query.tags}
    if(req.query.subCategory)
    blogfilter.subCategory = {"$all":req.query.subCategory}
    if(req.query.category)
    blogfilter.category= {"$all":req.query.category}
    if(req.query.authorId)
    blogfilter.authorId = req.query.authorId
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
        let blog = req.body;
        if (Object.keys(blog).length===0) return res.status(400).send({ status: false, msg: "Bad Request" });
        let blogId = req.params.blogId;
        let blogToBeUpdted = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blogToBeUpdted) return res.status(404).send({ status: false, msg: "Blog does not exist" });
       
        blog["tags"] = lodash.uniq(blogToBeUpdted.tags.concat(req.body.tags||[]));
        blog["subCategory"] = lodash.uniq(blogToBeUpdted.subCategory.concat(req.body.subCategory||[]));
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

/*############################################# DELETE APIS ################################################*/


const blogDeletById = async (req, res) => {
    try {
    await blogModel.findOneAndUpdate({ _id: req.params.blogId }, { isDeleted: true })
    res.status(200).send()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const blogDeletByParams = async (req, res) => {
    try {
        let blogfilter={}
        blogfilter.isDeleted=false
        blogfilter.isPublished=true
     
    if(req.query.tags)
    blogfilter.tags = {"$all":req.query.tags}
    if(req.query.subCategory)
    blogfilter.subCategory = {"$all":req.query.subCategory}
    if(req.query.category)
    blogfilter.category= {"$all":req.query.category}
    blogfilter.authorId = req.headers.authorId
    let blogs = await blogModel.find(blogfilter)
    console.log(blogs)
    for(let i=0;i<blogs.length;i++){

      let temp=blogs[i]
      temp.isDeleted = true
      let blogId = temp["_id"]
      let abc=await blogModel.findOneAndUpdate( {_id:blogId},{ $set:{isDeleted:true,deletedAt: moment().format("YYYY MM DDThh:mm:ss.SSS[Z]") }},{new: true,upsert:true,strict:false})
      console.log(abc)
    }
    
    res.status(200).send()
} catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

    
    
}


module.exports.blogs = blogs
module.exports.createBlogDoc = createBlogDoc
module.exports.blogPut = blogPut
module.exports.blogDeletById = blogDeletById
module.exports.blogDeletByParams = blogDeletByParams
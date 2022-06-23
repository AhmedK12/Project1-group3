const blogModel = require("../Models/blogModel")
const moment = require('moment')
const lodash = require('lodash')
const mongoose = require("mongoose")
const authorModel = require('../Models/authorModel')

const validateObjectId = (id,res,whatIs)=>{
    var regex = /[a-f0-9]{24}/;
    if(!regex.test(id)) return res.status(400).send({status:false,msg:`${whatIs} is Not Valid`})
}

/*####################################################### POST API ####################################################*/




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
        let query=req.query
        let{tags,subCategory,category,authorId}=query
        let filterdata={isDeleted:false,isPublished:true}

        if(tags){

            // tags=JSON.parse(JSON.stringify{})

            // console.log("tags",tags)

            // return
            filterdata.tags={"$in":req.query.tags}        }
        if(subCategory){
            filterdata.subCategory = subCategory
        }

        if(category){
            filterdata.category = category
        }

        if(authorId){
          filterdata.authorId = authorId
        }
        console.log(filterdata)
        let savedata = await blogModel.find(filterdata)
         return res.send(savedata)
    //    let abcd = [1,2,3,4]




    // req.query["isDeleted"] = false
    // req.query["isPublished"] = true 
    // if(req.query.tags)
    // req.query.tags = {"$in":req.query.tags}
    // if(req.query.subCategory)
    // req.query.subCategory = {"$in":req.query.subCategory}
    // let blogs = await blogModel.find(req.query)
    // if (Object.keys(blogs).length === 0) return res.status(404).send({ status: false, msg: "Data not Found" })
    // return res.status(200).send({ status: true, data: blogs })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}







/*##################################################### PUT API ##################################################*/






const blogPut = async (req, res) => {


    try {
        let authorId = req.headers.authorId;
        let blogAuthorId = await blogModel.findById(req.params.blogId,{authorId:1,_id:-1})
        if(authorId!==blogAuthorId) return res.send({error:"err"})
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


// find({},{},{})


/*############################################# DELETE APIS ################################################*/


const blogDeletById = async (req, res) => {
    try {
    await blogModel.findOneAndUpdate({ _id: req.params.blogId }, { isDeleted: true })
    res.status(200).send()
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const blogDeletByParams = async (req, res) => {
    
    try {
    let blogToBeDeleted = await blogModel.find(req.query)
    if (Object.keys(blogToBeDeleted).length===0) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
    for(let i=0;i<blogToBeDeleted.length;i++){
    let temp = JSON.parse(JSON.stringify(blogToBeDeleted[i]));
    temp["deletedAt"] = moment().format("YYYY MM DDThh:mm:ss.SSS[Z]");
    temp.isDeleted = true
    let blogId = temp["_id"]
    await blogModel.findOneAndUpdate( {_id:blogId}, temp,{ new: true, upsert: true, strict: false })
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
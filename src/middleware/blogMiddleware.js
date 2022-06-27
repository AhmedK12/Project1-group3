const validators = require('./validators')
const blogModel = require('../Models/blogModel.js')





/*****************************************************************CREATE VALIDATOR *********************************************************/




const validateCreateBlogRequest = async (req,res,next)=>{
    try {
        let errorMsg = {}
        if(Object.keys(req.body).length===0) return res.status(400).send({status:false,msg:"Bad Request"})
        errorMsg.title = req.body.title===undefined?"Required":typeof req.body.title!=='string'?"Invlid": undefined
        errorMsg.body = req.body.body===undefined?"Required":typeof req.body.body!=='string'?"Invlid": undefined
        errorMsg.category = req.body.category===undefined?"Required":typeof req.body.category!=='string'?"Invlid":undefined
        errorMsg.authorId = req.body.authorId===undefined?"Required":typeof req.body.authorId!=='string'?"Invlid": validators.validateObjectId(req.body.authorId,"AuthorId")
        Object.keys(errorMsg).forEach(key => errorMsg[key] === undefined && delete errorMsg[key])
        if(Object.keys(errorMsg).length!==0) return res.status(400).send({status:false,msg:errorMsg})
    } catch (error) {
       return res.status(500).send({ msg: "Error", error: error.message })
    }
    next()
}

/*****************************************************************GET VALIDATOR *********************************************************/




const vlidateBlogGetRequest = async (req,res,next)=>{
    try {
        if(req.query.authorId && validators.validateObjectId(req.query.authorId,"Auther")!==undefined) return res.status(400).send({status:false,msg:"AuthorId is Not Valid"})
        req.query.tags = req.query.tags !== undefined?validators.validateTags(req.query.tags):undefined
        req.query.subCategory = req.query.subCategory !== undefined?validators.validateTags(req.query.subCategory):undefined
    }   catch (error) {
        return res.status(500).send({ msg: "Error", error: error.message })
    }
    next()
}



/*****************************************************************PUT VALIDATOR *********************************************************/




const validatePutRequest = async (req,res,next)=>{
    try {
        let objectIdRegex = /^[0-9a-f]{24}$/
        if(!objectIdRegex.test(req.params.blogId)) return res.status(400).send({status:false,msg:"blogId is Not Valid"});
        let blogToBeUpdted = await blogModel.findOne({ _id: req.params.blogId, isDeleted: false })
        if (!blogToBeUpdted) return res.status(404).send({ status: false, msg: "Blog does not exist" });
        if(req.headers.authorId !== blogToBeUpdted.authorId.toString()) return res.status(403).send({status:false,msg:"Access Denied"})
        req.headers["blogToBeUpdted"] = blogToBeUpdted
        if(req.body.tags) req.body.tags = validators.validateTags(req.body.tags)
        if(req.body.subCategory) req.body.subCategory = validators.validateTags(req.body.subCategory)
    }   catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    } 
    next()
    
}





/*****************************************************************DELETE VALIDATOR *********************************************************/



const validateDeleteByBlogIdRequest = async (req,res,next)=>{
    try {
        if (!req.params.blogId) return res.status(400).send({ status: false, msg: "Bad Request" });
        if(! /^[0-9a-f]{24}$/.test(req.params.blogId)) return res.status(400).send({status:false,msg:"blogId is Not Valid"});
        let blogToBeDeleted = await blogModel.findOne({ _id: req.params.blogId, isDeleted: false })
        return !blogToBeDeleted? (res.status(404).send({ status: false, msg: "Blog DoesNot Exist" })):req.headers.authorId !== blogToBeDeleted.authorId.toString()?res.status(403).send({status:false,msg:"Access Denied"}):next()
    }   catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



const validateDeleteByQueryParams = async (req,res,next)=>{
     try {
        if(!req.query) return res.status(400).send({status:true,msg:"Query Must Be Present"})
        if(req.query.authorId!==undefined) if(req.headers.authorId!==req.query.authorId) return res.status(400).send({status:true,msg:"Aceess Denied"})
        req.query.tags = req.query.tags !== undefined?validators.validateTags(req.query.tags):undefined
        req.query.subCategory = req.query.subCategory !== undefined?validators.validateTags(req.query.subCategory):undefined
        next()
     }  catch (error) {
        res.status(500).send({ status: false, msg: error.message })
     }
    
}






module.exports.validateDeleteByBlogIdRequest = validateDeleteByBlogIdRequest
module.exports.validateDeleteByQueryParams = validateDeleteByQueryParams
module.exports.validateCreateBlogRequest = validateCreateBlogRequest
module.exports.vlidateBlogGetRequest = vlidateBlogGetRequest
module.exports.validatePutRequest = validatePutRequest

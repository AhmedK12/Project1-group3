// ////////////////////////////
const validateDeleteByBlogIdRequest = async (req,res,next)=>{
    try {
    if (!req.params.blogId) return res.status(400).send({ status: false, msg: "Bad Request" });
    let objectIdRegex = /^[0-9a-f]{24}$/
    if(!objectIdRegex.test(req.params.blogId)) return res.status(400).send({status:false,msg:"blogId is Not Valid"});
    let blogToBeDeleted = await blogModel.findOne({ _id: req.params.blogId, isDeleted: false })
    if (!blogToBeDeleted) return res.status(404).send({ status: false, msg: "Blog DoesNot Exist" });
    } catch (error) {
        
    }
    next()
  
}


// ////////////////////////////////
const validateDeleteByQueryParams = async (req,res,next)=>{
    if(!req.query) return res.status(400).send({status:true,msg:"Query Must Be Present"})
    next()
    
}


module.exports.validateDeleteByBlogIdRequest = validateDeleteByBlogIdRequest
module.exports.validateDeleteByQueryParams = validateDeleteByQueryParams
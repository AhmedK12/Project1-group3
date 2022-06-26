const blogModel = require('../Models/blogModel.js')

//////////////////////////////
const validatePutRequest = async (req,res,next)=>{
    try {
        let objectIdRegex = /^[0-9a-f]{24}$/
        if(!objectIdRegex.test(req.params.blogId)) return res.status(400).send({status:false,msg:"blogId is Not Valid"});
        let blogToBeUpdted = await blogModel.findOne({ _id: req.params.blogId, isDeleted: false })
        if (!blogToBeUpdted) return res.status(404).send({ status: false, msg: "Blog does not exist" });
        req.headers["blogToBeUpdted"] = blogToBeUpdted
        
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

    next()
    
}


module.exports.validatePutRequest = validatePutRequest


//////
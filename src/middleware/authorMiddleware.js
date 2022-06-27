const validators = require("./validators")



const validateloginrequest = async (req,res,next)=>{
    try {
    let errorMsg = {}
    if(Object.keys(req.body).length===0) return res.status(400).send({status:false,msg:"Bad Request "})
    errorMsg.email = req.body.email===undefined?"Required":typeof req.body.email!=='string'?"Invlid": validators.validateEmail(req.body.email)
    errorMsg.password = req.body.password===undefined?"Required":typeof req.body.password!=='string'?"Invlid": validators.validatePassword(req.body.password)
    Object.keys(errorMsg).forEach(key => errorMsg[key] === undefined && delete errorMsg[key])
    if(Object.keys(errorMsg).length!==0) return res.status(400).send({status:false,msg:errorMsg})
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
    next()
}





const validateRequest = async (req,res,next)=>{
    
    try {
        let errorMsg = {}
        if(Object.keys(req.body).length===0) return res.status(400).send({status:false,msg:"Bad Request"})
        errorMsg.fname = req.body.fname===undefined?"Required":typeof req.body.fname!=='string'?"Invlid": validators.validateName(req.body.fname,"fname")
        errorMsg.lname = req.body.lname===undefined?"Required":typeof req.body.lname!=='string'?"Invlid": validators.validateName(req.body.lname,"lname")
        errorMsg.email = req.body.email===undefined?"Required":typeof req.body.email!=='string'?"Invlid": validators.validateEmail(req.body.email)
        errorMsg.password = req.body.password===undefined?"Required":typeof req.body.password!=='string'?"Invlid": validators.validatePassword(req.body.password)
        errorMsg.title = req.body.title===undefined?"Required":typeof req.body.title!=='string'?"Invlid": validators.validateAuthorTitle(req.body.title)
        Object.keys(errorMsg).forEach(key => errorMsg[key] === undefined && delete errorMsg[key])
        if(Object.keys(errorMsg).length!==0) return res.status(400).send({status:false,msg:errorMsg})
    } catch (error) {
       return res.status(500).send({ msg: "Error", error: error.message })
    }
    next()
}   


module.exports.validateRequest = validateRequest
module.exports.validateloginrequest = validateloginrequest
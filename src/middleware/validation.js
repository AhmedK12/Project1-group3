

const validateAuthorId = (req,res,next)=>{
    var regex = /[a-f0-9]{24}/;
    if(!regex.test(req.body.authorId)) return res.status(400).send({status:false,msg:"Author Id is Not Valid"})
    next()
}





const validateEmail = (req,res,next)=>{
    var regex = /\S+@\S+\.\S+/;
    if(!regex.test(req.body.email)) return res.status(400).send({status:false,msg:"Email is Not Valid"})
    next()


  }



  module.exports.validateAuthorId =validateAuthorId
  module.exports.validateEmail = validateEmail
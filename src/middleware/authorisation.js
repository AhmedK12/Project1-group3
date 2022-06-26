const jwt=require("jsonwebtoken");
const { find } = require("lodash");
const blogModel=require("../Models/blogModel")
const moment=require("moment")


const authorise= async function(req, res, next)   {

    try{    
    let token = req.headers["x-api-key"];
    if (!token) {

        token = req.headers["X-Api-Key"];
      }
    // let decodedToken = jwt.verify(token,"blogProject");
    req.query.authorId= req.headers.authorId
    
    let qBlogs=await blogModel.find(req.query.authorId)
    for(let i=0;i<qBlogs.length;i++){
      let temp=qBlogs[i]
      temp.isDeleted = true
      let blogId = temp["_id"]
      await blogModel.findOneAndUpdate( {_id:blogId}, temp,{ $set:{isDeleted:true,deletedAt: moment().format("YYYY MM DDThh:mm:ss.SSS[Z]") }},{new: true})

    res.status(200).send()
    
    
    }
}
catch(err){ res.status(500).send({ msg: "Error", error: err.message })}
next()
}



// /////////////////////////////////////////////////////////////////////////////////////


const authorised = async function(req, res, next) {
  try{    
  let token = req.headers["x-api-key"];
  if (!token) {

      token = req.headers["X-Api-Key"];
    }
    
  let decodedToken = jwt.verify(token,"blogProject");
  if(!req.params.blogId) return res.send({error:"error"})
  let blogData= await blogModel.findById(req.params.blogId)
  if(!blogData)return res.send({error:"error"}) 
  let findAuthorId = decodedToken.authorId
  let checkPathAuthor = blogData.authorId
  if (checkPathAuthor !== findAuthorId) 
  // console.log(typeof checkPathAuthor + " " + typeof findAuthorId)
  return res.status(400).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
 
}
catch(err){ res.status(500).send({ msg: "Error", error: err.message })}

next()

}
// ///{
  // let authorId = req.headers.authorId;
  
 

module.exports.authorised=authorised

module.exports.authorise=authorise
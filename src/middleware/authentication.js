const authorModel=require("../Models/authorModel")
const jwt=require("jsonwebtoken")


// ////////////////////////////////////////
const authenticate=async function (req, res,next) {
    try{ 
  let token = req.headers["x-api-key"];
  if (!token) {

    token = req.headers["X-Api-Key"];
  }
  if (!token) {

    return res.send({ status: false, Msg: "Token must be present" })
  }

  let decodedToken = jwt.verify(token, "blogProject");
   req.headers.authorId=decodedToken.authorId
  if (!decodedToken) {
    return res.send({ status: false, Msg: "Token is Invalid" })
  }}
  catch(err){res.status(500).send({ msg: "Error", error: err.message })}
  next()
}
module.exports.authenticate=authenticate

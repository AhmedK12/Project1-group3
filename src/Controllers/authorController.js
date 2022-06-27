const authorModel = require("../Models/authorModel");
const jwt = require("jsonwebtoken");



const createAuthor = async function (req, res) {
  try {
    let author = {}
    author.fname = req.body.fname;
    author.lname = req.body.lname;
    author.title = req.body.title
    author.email = req.body.email;
    author.password = req.body.password
    let savedData = await authorModel.create(author);
    res.status(201).send({status:true, msg: savedData });
  } catch (err) {
   
    res.status(500).send({ msg: "Error", error: err.message });
  }
};



const authorLogin = async function (req, res) {
  try{ 
  authorName = req.body.email
  authorPassword = req.body.password
  let authorDetails = await authorModel.findOne({ email: authorName, password: authorPassword })
  if (!authorDetails) return res.status(400).send({ status: false, MSg: "Email or Password is Invalid" })
  let token = jwt.sign(
    {
      authorId: authorDetails._id.toString(),
    }, "blogProject");
  res.setHeader("x-api-key", token);
  res.status(201).send({ status: true, token: token })
}
catch(err){
  res.status(500).send({ msg: "Error", error: err.message })
}
}


module.exports.authorLogin=authorLogin
module.exports.createAuthor = createAuthor;

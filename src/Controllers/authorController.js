const authorModel = require("../Models/authorModel");




const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length != 0) {
      let savedData = await authorModel.create(data);
      res.status(201).send({status:true, msg: savedData });
    } else res.status(400).send({ msg: "BAD REQUEST" });
  } catch (err) {
   
    res.status(500).send({ msg: "Error", error: err.message });
  }
};



const authorLogin = async function (req, res) {
  try{ 
      authorName = req.body.email
      authorPassword = req.body.password
  

  let authorDetails = await authorModel.findOne({ email: authorName, password: authorPassword })
  if (!authorDetails) return res.status(400).send({ status: false, MSg: "authorName or authorpassword is invalid" })
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
